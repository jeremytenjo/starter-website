import type { PlaywrightTestConfig } from '@playwright/test'
import defaultPlaywrightConfig from './devtools/testing/playwright/playwright.config.js'

// added in root in order for playwright vs code extension to detect our config
const config: PlaywrightTestConfig = {
  ...defaultPlaywrightConfig,
}

export default config
