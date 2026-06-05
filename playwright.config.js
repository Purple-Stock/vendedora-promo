import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:3456",
  },
  webServer: {
    command: "npx serve . -p 3456",
    url: "http://127.0.0.1:3456",
    reuseExistingServer: !process.env.CI,
  },
});
