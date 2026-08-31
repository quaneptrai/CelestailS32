from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT = Path(__file__).parent / ".screenshots"


def collect_errors(page):
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(f"pageerror: {error}"))
    page.on("console", lambda message: errors.append(f"console: {message.text}") if message.type == "error" else None)
    return errors


def main() -> None:
    OUTPUT.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, executable_path=CHROME, args=["--disable-gpu-sandbox"])

        desktop = browser.new_page(viewport={"width": 1920, "height": 1080})
        desktop_errors = collect_errors(desktop)
        desktop.goto(BASE_URL, wait_until="networkidle")
        desktop.locator(".app.three-ready").wait_for(timeout=10_000)
        assert desktop.locator(".planet-node").count() == 8
        assert desktop.locator("#threeCanvas").is_visible()
        assert desktop.locator("#threeCanvas").bounding_box()["width"] >= 1800
        assert desktop.locator("#threeCanvas").evaluate("canvas => Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))")
        assert not desktop.locator(".knowledge-feed").is_visible()
        assert not desktop.locator(".inspector").is_visible()
        assert not desktop.locator(".topbar").is_visible()
        desktop.wait_for_timeout(900)
        desktop.screenshot(path=OUTPUT / "desktop-three-universe.png", full_page=True)

        desktop.evaluate("window.dispatchEvent(new CustomEvent('mcu-planet-select', {detail: {id: 'jupiter'}}))")
        desktop.locator(".app.focused").wait_for()
        desktop.locator('.moon-node[data-moon="RGB LED"]').wait_for()
        desktop.wait_for_timeout(800)
        desktop.screenshot(path=OUTPUT / "desktop-three-jupiter.png", full_page=True)

        desktop.locator('.moon-node[data-moon="RGB LED"]').click(force=True)
        desktop.locator(".gpio-modal").wait_for()
        desktop.locator('[data-action="gpio-trace"][data-step="5"]').click()
        assert desktop.locator(".led-state.on").is_visible()
        desktop.screenshot(path=OUTPUT / "desktop-gpio-explorer.png", full_page=True)

        desktop.locator('.gpio-modal [data-action="lab"]').click()
        desktop.locator(".lab-modal").wait_for()
        assert desktop.locator(".lab-register-primer").is_visible()
        desktop.screenshot(path=OUTPUT / "desktop-bare-metal-lab.png", full_page=True)

        desktop.keyboard.press("Escape")
        desktop.evaluate("window.dispatchEvent(new CustomEvent('mcu-sun-select'))")
        desktop.locator(".system-atlas-modal").wait_for()
        assert desktop.locator(".atlas-path").count() == 4
        desktop.wait_for_timeout(300)
        desktop.screenshot(path=OUTPUT / "desktop-system-atlas.png", full_page=True)

        desktop.keyboard.press("Escape")
        desktop.keyboard.press("Control+K")
        desktop.locator(".search-modal").wait_for()
        desktop.locator("#commandInput").fill("LPUART")
        desktop.locator('#searchResults [data-result="jupiter:OpenSDA UART"]').wait_for()
        desktop.keyboard.press("Escape")

        desktop.keyboard.press("n")
        desktop.locator(".add-modal").wait_for()
        desktop.locator('input[name="title"]').fill("Ghi chú smoke test")
        desktop.locator('textarea[name="summary"]').fill("Kiểm tra luồng lưu local draft.")
        desktop.locator("#addForm").evaluate("form => form.requestSubmit()")
        desktop.locator(".add-modal").wait_for(state="hidden")
        assert desktop.evaluate("JSON.parse(localStorage.getItem('mcuCosmosNotes') || '[]').some(note => note.title === 'Ghi chú smoke test')")

        desktop.keyboard.press("r")
        desktop.locator(".review-modal").wait_for()
        desktop.locator('[data-action="reveal-answer"]').click()
        assert desktop.locator(".review-answer").is_visible()
        desktop.locator('[data-action="rate-review"]').first.click()
        desktop.locator(".review-modal").wait_for(state="hidden")
        assert not desktop_errors, desktop_errors

        compact = browser.new_page(viewport={"width": 1440, "height": 900})
        compact_errors = collect_errors(compact)
        compact.goto(BASE_URL, wait_until="networkidle")
        compact.locator(".app.three-ready").wait_for(timeout=10_000)
        compact.wait_for_timeout(600)
        compact.screenshot(path=OUTPUT / "desktop-three-1440.png", full_page=True)
        assert not compact_errors, compact_errors

        browser.close()

    print(f"VISUAL_SMOKE_OK: {OUTPUT}")


if __name__ == "__main__":
    main()
