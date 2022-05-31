// https://playwright.dev/docs/selectors
import { expect } from '@playwright/test'

export default async function exampleTest({ page }) {
  await page.goto('/')

  const header = await page.innerText('p')
  expect(header).toBe('We find the best products for you')
}
