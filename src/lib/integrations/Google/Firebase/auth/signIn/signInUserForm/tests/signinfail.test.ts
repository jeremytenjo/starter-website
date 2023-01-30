// https://playwright.dev/docs/selectors
import { expect, type Page } from '@playwright/test'

type SigninfailProps = {
  page: Page
}

export async function invalidEmail({ page }: SigninfailProps) {
  // Go to http://localhost:3001/
  await page.goto('http://localhost:3001/')

  // Click text=Sign InJoin >> p
  await page.locator('text=Sign InJoin >> p').click()
  await expect(page).toHaveURL('http://localhost:3001/signin')

  // Click [placeholder="Email"]
  await page.locator('[placeholder="Email"]').click()

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('hollasdf sdf ')

  // Click [placeholder="Password"]
  await page.locator('[placeholder="Password"]').click()

  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('password')

  // Click button:has-text("Sign in")
  await page.locator('button:has-text("Continue with Email")').click()

  // means it did not successfully redirect the user to the jobs page
  await expect(page).toHaveURL('http://localhost:3001/signin')
}
