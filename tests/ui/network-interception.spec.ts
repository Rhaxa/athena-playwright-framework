import { test, expect } from '../../src/fixtures/pomFixtures';

test.describe('Network Interception & Resilience', () => {

  test('should abort asset requests and verify graceful degradation', async ({ page, loginPage }) => {
    let assetAborted = false;

    // Intercept everything under /assets/ (JS, CSS, images) — URL verified via request log:
    //   GET https://www.saucedemo.com/assets/sauce-backpack-1200x1500-CjRW-Djj.jpg
    await page.route('**/assets/*', async (route) => {
      // Abort only images; keep JS/CSS flowing so the app itself doesn't break.
      // (We want to simulate a failing image CDN, not a failing app.)
      if (route.request().resourceType() === 'image') {
        assetAborted = true;
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);

    // The app must function normally despite its images failing
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    // And our handler must actually have fired — poll, don't read once
    await expect.poll(() => assetAborted, {
      message: 'at least one /assets/ image request should have been aborted',
    }).toBe(true);
  });

  test('should mock an image response and verify interception occurred', async ({ page, loginPage }) => {
    // Fulfill the backpack image request with a fake response.
    // The DOM's `src` attribute will NOT change (fulfill swaps the response,
    // not the markup) — so we prove interception via waitForResponse instead.
    const backpackImage = page.waitForResponse('**/*sauce-backpack*');

    await page.route('**/*sauce-backpack*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="tomato"/></svg>',
      });
    });

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);

    // Armed before the login click, resolves when the browser fires the request —
    // immune to the timing race that a boolean flag can't survive
    const response = await backpackImage;
    expect(response.url()).toContain('sauce-backpack');

    // Page still renders with the mocked image in place
    await expect(page.locator('.inventory_item_img img').first()).toBeVisible();
  });

  test('should intercept and inspect an application-triggered POST', async ({ page, loginPage }) => {
    // SauceDemo's login is client-side validation — it sends no login POST.
    // The only POSTs the app makes are error-analytics telemetry (verified in
    // the request log). This is the one genuinely app-triggered POST we can
    // intercept, and it exercises the exact skill: catch a POST, read its payload.
    let telemetryPayload: string | null = null;

    await page.route('**/events.backtrace.io/**', async (route) => {
      if (route.request().method() === 'POST') {
        telemetryPayload = route.request().postData();
      }
      await route.continue(); // let analytics through — don't alter app behavior
    });

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);
    await expect(page).toHaveURL(/.*inventory/);

    // The app fires its telemetry POST during the flow — wait for it
    await expect.poll(() => telemetryPayload, {
      message: 'the app should have submitted its telemetry POST',
    }).not.toBeNull();

    // Payload inspection: prove we saw inside the request body
    expect(telemetryPayload!).toContain('Application Launches');
  });

});