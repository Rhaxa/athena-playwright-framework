# 🛡️ Athena Playwright Framework

A production-grade, containerized test automation framework built with **Playwright** and **TypeScript**. 

> **Project Context:** This repository is the capstone project for "Project Athena," my intensive upskilling initiative to transition into a Senior Software Development Engineer in Test (SDET) role. It is designed to demonstrate modern test automation best practices, resilience, and DevOps integration readiness.

## 🏗️ Architecture & Key Features

This framework goes beyond basic UI scripting. It is engineered for scalability, maintainability, and real-world reliability:

- **Page Object Model (POM):** Strict separation of concerns. UI locators and actions are encapsulated in dedicated classes, keeping test specs clean and focused on business logic.
- **Custom Dependency Injection:** Utilizes Playwright's `base.extend` to automatically inject Page Objects into test signatures, eliminating boilerplate and ensuring strict test isolation.
- **Hybrid Testing (UI + API):** Demonstrates both end-to-end UI flows (SauceDemo) and standalone REST API contract testing (JSONPlaceholder) within the same framework.
- **Resilient Network Interception:** Advanced `page.route()` patterns to simulate CDN failures, mock asset responses, and inspect network payloads, proving application graceful degradation.
- **Environment Variable Management:** Secure handling of credentials and configurations via `.env` and GitHub Secrets, ensuring no secrets are ever hardcoded or committed.
- **Cross-Browser Ready:** Configured for Chromium, Firefox, and WebKit (with local execution optimized for speed, and full matrix reserved for CI/CD).
- **Containerized Execution:** Fully Dockerized for consistent, reproducible test runs across any environment (local, CI/CD, or cloud).

## 🛠️ Tech Stack

- **Core:** Playwright, TypeScript
- **Testing Patterns:** Page Object Model, Custom Fixtures, Auto-retrying Assertions
- **DevOps:** Docker, GitHub Actions (CI/CD pipeline integration)
- **Reporting:** Playwright HTML Reporter + Allure Report v3.x (Requires Java 17 LTS in CI/CD)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/) (Optional, for containerized execution)

### Local Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/Rhaxa/athena-playwright-framework.git
   cd athena-playwright-framework
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your target URLs and credentials.
   ```env
   BASE_URL=https://www.saucedemo.com
   STANDARD_USER=standard_user # Public sandbox credential (not a real secret)
   SECRET_PASSWORD=secret_sauce # Public sandbox credential (not a real secret)
   ```

4. Run the tests:
   ```bash
   npx playwright test
   ```

5. View the HTML Report:
   ```bash
   npx playwright show-report
   ```

6. Generate and view the Allure Report:
   ```bash
   npm run allure:generate
   npm run allure:serve
   ```

### 🐳 Docker Execution (Recommended for CI/CD parity)

To run the tests in an isolated, reproducible Linux environment identical to the CI/CD pipeline:

1. Build the Docker image:
   ```bash
   docker build -t athena-playwright:$(git rev-parse --short HEAD) .
   ```

2. Run the tests inside the container:
   ```bash
   docker run --rm --env-file .env athena-playwright:$(git rev-parse --short HEAD)
   ```
   *(The `--rm` flag ensures the container is automatically cleaned up after execution).*

### 📊 Viewing Downloaded CI/CD Reports

Because modern reporting tools (like Allure) are Single Page Applications (SPAs), opening the `index.html` file directly from your local file system will result in a browser security (CORS) error. To view the downloaded artifacts properly:

1. Download the artifact `.zip` from the GitHub Actions "Artifacts" section.
2. Extract the folder to your local machine.
3. Open your terminal, navigate into the extracted folder, and spin up a temporary local server:
   ```bash
   npx serve .
4. Open the provided local URL (e.g., http://localhost:3000) in your browser to view the fully interactive dashboard.

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
```

## 🎯 Future Enhancements

- Addition of visual regression testing using Playwright's built-in screenshot comparison.
- Expansion of API contract testing with schema validation (e.g., Zod or Joi).
- Integration with external test management tools (e.g., TestRail or Xray).

---
*Built with intentionality and a focus on engineering excellence.*