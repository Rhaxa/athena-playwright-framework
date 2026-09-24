import { test, expect } from '../src/fixtures/pomFixtures';

test.describe('SauceDemo E2E Shopping Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);
  });

  test('should add a product to cart and verify cart count', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    
    await inventoryPage.goToCart();
    
    // Auto-retrying assertion. Should reduce test flakiness.
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.title).toHaveText('Your Cart');
  });

  test('should add multiple products and proceed to checkout', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
    
    await inventoryPage.goToCart();
    
    // Auto-retrying assertion. Should reduce test flakiness.
    await expect(cartPage.cartItems).toHaveCount(2);
    
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  });
});