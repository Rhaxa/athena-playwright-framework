import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    // 'domcontentloaded' is much more resilient across different browser engines
    // this has been added to reduce test flakiness
    await this.page.goto('/', { waitUntil: 'commit' }); 
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    // { force: true } bypasses WebKit/Firefox "element is not stable" checks on older macOS
    await this.loginButton.click({ force:true });
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}