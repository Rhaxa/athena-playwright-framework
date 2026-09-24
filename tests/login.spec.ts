import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('SauceDemo Login Tests', () => {
  
  test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Arrange
    await loginPage.goto();
    
    // Act
    await loginPage.login(process.env.STANDARD_USER!, process.env.SECRET_PASSWORD!);
    
    // Assert
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Arrange
    await loginPage.goto();
    
    // Act
    await loginPage.login('standard_user', 'wrong_password');
    
    // Assert
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username and password do not match');
  });

});