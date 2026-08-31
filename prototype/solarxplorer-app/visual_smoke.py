from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173/"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT = Path(__file__).parent / ".screenshots"


def main() -> None:
    OUTPUT.mkdir(exist_ok=True)
    errors: list[str] = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            headless=True,
            executable_path=CHROME,
            args=["--disable-gpu-sandbox"],
        )
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        page.on("pageerror", lambda error: errors.append(f"pageerror: {error}"))
        page.on(
            "console",
            lambda message: errors.append(f"console: {message.text}")
            if message.type == "error"
            else None,
        )

        page.goto(BASE_URL, wait_until="networkidle", timeout=30_000)
        page.evaluate("localStorage.removeItem('s32k144-driver-school-progress-v2')")
        page.reload(wait_until="networkidle")
        page.locator("canvas").wait_for(timeout=15_000)
        page.wait_for_function(
            "window.MCU_DOMAINS && Object.keys(window.MCU_DOMAINS).length === 8"
        )
        page.wait_for_timeout(800)

        assert page.locator("canvas").is_visible()
        assert page.locator("canvas").evaluate(
            "canvas => Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))"
        )
        assert page.locator("#mcuNeonToolbar").is_visible()
        assert page.locator("#openStartCourse").is_visible()
        assert page.locator("#openGpioCourse").count() == 0
        assert page.evaluate("window.MCU_COURSE.modules.length") == 33
        assert page.evaluate("window.MCU_COURSE.phases.length") == 5
        assert page.locator("#chatbotContainer").count() == 0
        assert page.locator("#spaceMusic").count() == 0
        assert page.title().startswith("ARIS")
        assert "Inter" in page.locator("body").evaluate("el => getComputedStyle(el).fontFamily")
        assert page.locator(".planet-item").evaluate_all(
            "items => items.filter(item => getComputedStyle(item).display !== 'none').length"
        ) == 8
        page.screenshot(path=OUTPUT / "driver-school-universe.png", full_page=True)

        # Click the real moving Earth position on the canvas using its projected label.
        page.locator("#labelToggle").evaluate("button => button.click()")
        earth_label = page.locator(".planet-label").nth(2)
        earth_label.wait_for(state="visible")
        earth_point = earth_label.evaluate(
            "el => ({x: parseFloat(el.style.left), y: parseFloat(el.style.top) + 20})"
        )
        page.mouse.click(earth_point["x"], earth_point["y"])
        page.locator('#planetInfoCard[data-mcu-mode="planet-library"]').wait_for()
        assert "EARTH" in page.locator("#planetName").inner_text()
        page.locator("#closePlanetInfo").click()

        # The right-side planet list must open content, not only move the camera.
        page.locator("#celestialPanel .celestial-header").click()
        page.locator('.planet-item[data-body-name="Saturn"]').click()
        page.locator('#planetInfoCard[data-mcu-mode="planet-library"]').wait_for()
        assert "SATURN" in page.locator("#planetName").inner_text()
        page.locator("#closePlanetInfo").click()

        page.locator("#openStartCourse").click()
        page.locator('#planetInfoCard[data-mcu-mode="course-roadmap"]').wait_for()
        assert page.locator(".course-phase").count() == 5
        assert page.locator(".course-module-card").count() == 33
        assert page.locator('.course-module-card[data-course-index="0"] .course-module-number').inner_text() == "00"
        assert page.locator('.course-module-card[data-course-index="32"] .course-module-number').inner_text() == "32"
        page.screenshot(path=OUTPUT / "driver-school-roadmap-33.png", full_page=True)

        page.locator('.course-module-card[data-course-index="6"]').click()
        page.locator('#planetInfoCard[data-mcu-mode="planet-topic"] .course-lesson').wait_for()
        gpio_text = page.locator(".course-lesson").inner_text()
        assert "0x4004C03C" in gpio_text
        assert "0x400FF0D4" in gpio_text
        assert "0x40065130" in gpio_text
        assert page.locator(".course-pass-block").count() == 1
        assert page.locator(".course-reveal").count() == 2
        assert page.locator(".course-rich-table").count() >= 1
        page.locator("#courseCompleteBtn").click()
        assert page.evaluate(
            "JSON.parse(localStorage.getItem('s32k144-driver-school-progress-v2')).includes('06')"
        )
        page.screenshot(path=OUTPUT / "gpio-source-register-module-06.png", full_page=True)

        page.locator("#courseMapBtn").click()
        assert page.locator('#planetInfoCard[data-mcu-mode="planet-library"]').is_visible()
        assert page.locator('[data-planet-topic-index="6"]').evaluate(
            "element => element.classList.contains('is-complete')"
        )

        page.evaluate(
            "window.dispatchEvent(new CustomEvent('solarxplorer:body-selected', {detail:{name:'Mars'}}))"
        )
        assert page.locator('[data-planet-topic-index="15"]').count() == 1
        page.locator('[data-planet-topic-index="15"]').click()
        adc_text = page.locator(".course-lesson").inner_text()
        assert "0x4003B000" in adc_text
        assert "0x1F" in adc_text
        assert "0x3F" in adc_text
        assert "chip-specific" in adc_text
        assert "ADCH" in adc_text
        page.screenshot(path=OUTPUT / "adc-chip-specific-audit-module-15.png", full_page=True)

        page.evaluate(
            "window.dispatchEvent(new CustomEvent('solarxplorer:body-selected', {detail:{name:'Earth'}}))"
        )
        assert page.locator('#planetInfoCard[data-mcu-mode="planet-library"]').is_visible()
        assert page.locator('[data-planet-topic-index]').count() == 8
        page.screenshot(path=OUTPUT / "earth-gpio-topic-library.png", full_page=True)

        page.evaluate(
            "window.dispatchEvent(new CustomEvent('solarxplorer:body-selected', {detail:{name:'Saturn'}}))"
        )
        assert page.locator('[data-planet-topic-index]').count() == 7
        assert "COMMUNICATION" in page.locator("#planetName").inner_text()
        assert page.locator(".communication-map-grid article").count() == 5
        page.locator('[data-planet-topic-index="28"]').click()
        can_register_text = page.locator(".course-lesson").inner_text()
        assert "0x40024000" in can_register_text
        assert "0x40065090" in can_register_text
        assert "MB0=0x40024080" in can_register_text
        assert "Base + offset là phép chứng minh địa chỉ" in can_register_text
        assert page.locator(".course-theory-grid article").count() == 5
        page.locator("#courseMapBtn").click()
        page.locator('[data-planet-topic-index="27"]').click()
        can_network_text = page.locator(".course-lesson").inner_text()
        assert "PTE5" in can_network_text
        assert "PTE4" in can_network_text
        assert "CANH" in can_network_text
        assert "60Ω" in can_network_text
        page.screenshot(path=OUTPUT / "saturn-flexcan-network-topics.png", full_page=True)

        page.locator("#showUIBtn").evaluate("button => button.style.display = 'none'")
        page.evaluate("document.getElementById('universeOnlyBtn').click()")
        page.wait_for_function("document.body.classList.contains('universe-only')")
        assert not page.locator("#uiControls").is_visible()
        assert not page.locator("#planetInfoCard").is_visible()
        assert page.locator("#showUIBtn").is_visible()
        page.screenshot(path=OUTPUT / "universe-only.png", full_page=True)

        page.locator("#showUIBtn").click()
        page.wait_for_function("!document.body.classList.contains('universe-only')")
        page.evaluate("window.dispatchEvent(new CustomEvent('solarxplorer:sun-selected'))")
        assert page.locator('#planetInfoCard[data-mcu-mode="course-roadmap"]').is_visible()
        assert page.locator(".course-module-card").count() == 33
        page.screenshot(path=OUTPUT / "sun-opens-unified-roadmap.png", full_page=True)

        assert not errors, errors
        browser.close()

    print(f"DRIVER_SCHOOL_V2_VISUAL_SMOKE_OK: {OUTPUT}")


if __name__ == "__main__":
    main()
