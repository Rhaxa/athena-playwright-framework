import { test, expect } from '../../src/fixtures/pomFixtures';

test.describe('Network Interception & Resilience', () => {

  test('should intercept and abort a network asset to verify graceful degradation', async ({ page, loginPage }) => {
    // DEBUG: listen first, act second
  page.on('request', req => console.log('>>', req.method(), req.url()));

    let assetAborted = false;
    
    // 1. Intercept ALL requests to the /assets/ directory
    await page.route('**/assets/*', async (route) => {
      // 2. Only abort if it's an image (leaving JS/CSS intact so the app doesn't break)
      if (route.request().resourceType() === 'image') {
        assetAborted = true;
        await route.abort(); // Simulate a CDN failure for images
      } else {
        await route.continue();
      }
    });

    // 3. Perform the UI action
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);
    
    // 4. CORE ASSERTION: The application successfully navigated and functioned 
    // DESPITE the network failure of its images. This proves resilience.
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    // 5. Verify our route actually caught the image request
    expect(assetAborted).toBe(true);
  });

});