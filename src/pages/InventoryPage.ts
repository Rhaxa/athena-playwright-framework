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
    const productCard = this.page.locator('.inventory_item', {
      hasText: productName,
    });
    await productCard.locator('button').click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}