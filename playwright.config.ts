import type { PlaywrightTestConfig } from '@playwright/test'
import defaultPlaywrightConfig from './devtools/testing/playwright/playwright.config.js'

const config: PlaywrightTestConfig = {
  ...defaultPlaywrightConfig,
}

export default config
