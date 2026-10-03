import { defineConfig } from '@playwright/test';
const port = Number(process.env.FB_TEST_PORT || 10015);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid FB_TEST_PORT');
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests', testMatch: 'viewer.spec.ts', outputDir: './tmp/playwright-results',
  // PW_CHANNEL=chrome runs against installed Google Chrome when the bundled Chromium download is unavailable.
  webServer: {command: 'docker compose -f compose.test.yaml up --build test-viewer', url: baseURL, env: {FB_TEST_PORT: String(port)}, reuseExistingServer: false, timeout: 120000},
  use: {baseURL, browserName: 'chromium', ...(process.env.PW_CHANNEL ? {channel: process.env.PW_CHANNEL} : {})},
});
