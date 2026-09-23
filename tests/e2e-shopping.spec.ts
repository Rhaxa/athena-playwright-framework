import { test, expect } from '../src/fixtures/pomFixtures';

test.describe('SauceDemo E2E Shopping Flow', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should add a product to cart and verify cart count', async ({
    inventoryPage,
    cartPage,
  }) => {
    // Act - Add product
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    // Assert - Badge shows 1
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Act - Navigate to cart
    await inventoryPage.goToCart();

    // Assert - Cart has 1 item
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);
    await expect(cartPage.title).toHaveText('Your Cart');
  });

  test('should add multiple products and proceed to checkout', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    // Act - Add two products
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    // Assert - Badge shows 2
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Act - Go to cart and checkout
    await inventoryPage.goToCart();
    expect(await cartPage.getItemCount()).toBe(2);
    await cartPage.proceedToCheckout();

    // Assert - We land on the checkout info page
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  });
});