// https://playwright.dev/docs/selectors
import { expect, type Page } from '@playwright/test'

type SigninFormProps = {
  page: Page
}

export default async function signinFormTest({ page }: SigninFormProps) {
  await page.goto('http://localhost:3001/')

  await page.locator('text=Sign InJoin >> p').click()
  await expect(page).toHaveURL('http://localhost:3001/signin')

  await page.locator('[placeholder="Email"]').click()
  await page.locator('[placeholder="Email"]').fill('creator1@email.com')

  await page.locator('[placeholder="Password"]').click()
  await page.locator('[placeholder="Password"]').fill('password')

  await page.locator('button:has-text("Continue with Email")').click()

  await expect(page).toHaveURL('http://localhost:3001/jobs')
}
