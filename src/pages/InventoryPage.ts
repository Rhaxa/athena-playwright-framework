import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProductToCart(productName: string) {
    const dataTestId = `add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}`;
    const button = this.page.locator(`[data-test="${dataTestId}"]`);
    // Playwright auto-waits for visibility. 
    // { force: true } bypasses the "stability" check that hangs on older macOS WebKit/Firefox.
    await button.click({ force: true });
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click({ force: true });
  }
}