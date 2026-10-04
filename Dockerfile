# 1. The official Playwright image matching the package.json version
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first (Docker caching optimization)
# If these don't change, Docker reuses the cached 'npm install' layer
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy the rest of the application code into the container
COPY . .

# 6. Set environment variables for headless execution inside Docker
ENV CI=true

# 7. The default command to run when the container starts
CMD ["npx", "playwright", "test"]