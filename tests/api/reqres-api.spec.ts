import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Tests', () => {
  
  test('GET: should retrieve a list of users', async ({ request }) => {
    // Act
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    
    // Assert
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(10); // JSONPlaceholder always returns 10 users
    expect(body[0]).toHaveProperty('email');
  });

  test('POST: should create a new user', async ({ request }) => {
    // Arrange
    const newUser = {
      name: 'Axel QA',
      job: 'Senior SDET'
    };

    // Act
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: newUser,
    });

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.job).toBe(newUser.job);
    expect(body.id).toBeDefined(); // JSONPlaceholder generates a fake ID
  });

});