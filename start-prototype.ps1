param([switch]$NoOpen)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$prototypeRoot = Join-Path $projectRoot 'prototype\solarxplorer-app'
$pidFile = Join-Path $projectRoot '.prototype-server.pid'
$port = 4173
$url = "http://127.0.0.1:$port/"

if (-not (Test-Path -LiteralPath $prototypeRoot)) {
    throw "Prototype directory not found: $prototypeRoot"
}

$existingPrototype = $false
try {
    $existingResponse = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    $existingPrototype = $existingResponse.Content -match 'mcu-learning\.js'
    if (-not $existingPrototype) {
        throw "Port $port is already used by another web server. Stop that server, then run this script again."
    }
} catch [System.Net.WebException] {
    $existingPrototype = $false
}

if (-not $existingPrototype) {
    $node = (Get-Command node -ErrorAction Stop).Source
    $vite = Join-Path $prototypeRoot 'node_modules\vite\bin\vite.js'
    if (-not (Test-Path -LiteralPath $vite)) {
        throw "Dependencies are missing. Run: cd '$prototypeRoot'; npm ci --ignore-scripts"
    }
    $serverArgs = @($vite, '--host', '127.0.0.1', '--port', "$port", '--strictPort')
    $server = Start-Process -FilePath $node -ArgumentList $serverArgs -WorkingDirectory $prototypeRoot -WindowStyle Hidden -PassThru
    $ready = $false
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        Start-Sleep -Milliseconds 250
        if ($server.HasExited) {
            throw "Vite exited before the prototype was ready (exit code $($server.ExitCode))."
        }
        try {
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
            if ($response.Content -match 'mcu-learning\.js') {
                $ready = $true
                break
            }
        } catch [System.Net.WebException] {
            continue
        }
    }
    if (-not $ready) {
        Stop-Process -Id $server.Id -ErrorAction SilentlyContinue
        throw "Vite did not become ready at $url within 5 seconds."
    }
    Set-Content -LiteralPath $pidFile -Value $server.Id -Encoding ascii
    Write-Host "Prototype server started (PID $($server.Id))." -ForegroundColor Green
} else {
    Write-Host "ARIS learning universe is already listening on port $port." -ForegroundColor Yellow
}

if (-not $NoOpen) {
    Write-Host "Opening $url" -ForegroundColor Cyan
    Start-Process -FilePath $url
} else {
    Write-Host "Prototype ready at $url" -ForegroundColor Cyan
}
