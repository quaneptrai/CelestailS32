$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $projectRoot '.prototype-server.pid'

if (-not (Test-Path -LiteralPath $pidFile)) {
    Write-Host 'No prototype PID file was found.' -ForegroundColor Yellow
    exit 0
}

$serverPid = [int](Get-Content -LiteralPath $pidFile -Raw)
$process = Get-Process -Id $serverPid -ErrorAction SilentlyContinue

if ($process -and $process.ProcessName -match '^(python|node)$') {
    Stop-Process -Id $serverPid
    Write-Host "Prototype server stopped (PID $serverPid)." -ForegroundColor Green
} elseif ($process) {
    throw "PID $serverPid belongs to '$($process.ProcessName)', not a prototype server. Nothing was stopped."
} else {
    Write-Host "Prototype process $serverPid is no longer running." -ForegroundColor Yellow
}

Remove-Item -LiteralPath $pidFile -Force
