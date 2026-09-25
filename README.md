# 🛡️ Athena Playwright Framework

A production-grade, containerized test automation framework built with **Playwright** and **TypeScript**. 

> **Project Context:** This repository is the capstone project for "Project Athena," my intensive upskilling initiative to transition into a Senior Software Development Engineer in Test (SDET) role. It is designed to demonstrate modern test automation best practices, resilience, and DevOps integration readiness.

## 🏗️ Architecture & Key Features

This framework goes beyond basic UI scripting. It is engineered for scalability, maintainability, and real-world reliability:

- **Page Object Model (POM):** Strict separation of concerns. UI locators and actions are encapsulated in dedicated classes, keeping test specs clean and focused on business logic.
- **Custom Dependency Injection:** Utilizes Playwright's `base.extend` to automatically inject Page Objects into test signatures, eliminating boilerplate and ensuring strict test isolation.
- **Hybrid Testing (UI + API):** Demonstrates both end-to-end UI flows (SauceDemo) and standalone REST API contract testing (JSONPlaceholder) within the same framework.
- **Resilient Network Interception:** Advanced `page.route()` patterns to simulate CDN failures, mock asset responses, and inspect network payloads, proving application graceful degradation.
- **Environment Variable Management:** Secure handling of credentials and configurations via `.env` and `dotenv`, ensuring no secrets are ever hardcoded or committed.
- **Cross-Browser Ready:** Configured for Chromium, Firefox, and WebKit (with local execution optimized for speed, and full matrix reserved for CI/CD).
- **Containerized Execution:** Fully Dockerized for consistent, reproducible test runs across any environment (local, CI/CD, or cloud).

## 🛠️ Tech Stack

- **Core:** Playwright, TypeScript
- **Testing Patterns:** Page Object Model, Custom Fixtures, Auto-retrying Assertions
- **DevOps:** Docker, GitHub Actions (CI/CD pipeline integration)
- **Reporting:** Playwright HTML Reporter (with traces, screenshots, and videos on failure)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

### Local Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rhaxa/athena-playwright-framework.git
   cd athena-playwright-framework

2. **Install dependencies:**
   ```bash
   npm install

3. **Set up environment variables:**
    Create a .env file in the root directory with your target URLs and credentials.
    ```env
    BASE_URL=https://www.saucedemo.com
    STANDARD_USER=standard_user
    SECRET_PASSWORD=secret_sauce

4. **Run the tests:**
    ```bash
    npx playwright test

5. **View the HTML report:**
    ```bash
    npx playwright show-report

## 🐳 Docker Execution (Recommended for CI/CD parity)
To run the tests in an isolated, reproducible Linux environment identical to the CI/CD pipeline:

1. **Build the Docker image:**
    ```bash
    docker build -t athena-playwright:latest .

2. **Run the tests inside the container:**
    ```bash
    docker run --rm --env-file .env athena-playwright:latest``

(The --rm flag ensures the container is automatically cleaned up after execution).

## 📂 Project Structure

```text
athena-playwright-framework/
├── src/
│   ├── pages/          # Page Object Model classes
│   └── fixtures/       # Custom Playwright fixtures
├── tests/
│   ├── api/            # Standalone REST API tests
│   ├── ui/             # E2E UI and Network Interception tests
│   └── *.spec.ts       # Test specifications
├── .env                # Environment variables (gitignored)
├── .gitignore          # Git ignore rules
├── .dockerignore       # Docker ignore rules
├── Dockerfile          # Containerization configuration
├── package.json        # Node dependencies and scripts
└── playwright.config.ts# Playwright configuration

## 🎯 Future Enhancements
- Integration of Allure Report for advanced test analytics.
- Expansion of the GitHub Actions CI/CD workflow to include scheduled nightly cross-browser runs.
- Addition of visual regression testing using Playwright's built-in screenshot comparison.

Built with intentionality and a focus on engineering excellence.