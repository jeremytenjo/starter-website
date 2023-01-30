// https://playwright.dev/docs/selectors
import { expect, type Page } from '@playwright/test'
import signinFormTest from '../../../../integrations/Google/Firebase/auth/signIn/signInUserForm/tests/signinForm.test.js'

type PrivatePageOverlayProps = {
  page: Page
}

export default async function PrivatePageOverlayTest({ page }: PrivatePageOverlayProps) {
  await signinFormTest({ page })

  await page.locator('text=Home').click()
  await expect(page).toHaveURL('http://localhost:3001/')

  await page.locator('[aria-label="account"]').click()
  await page.locator('text=Edit profile').click()
  await expect(page).toHaveURL('http://localhost:3001/settings/edit-profile')

  await expect(page.locator('[data-id=PrivatePageOverlay]')).toHaveCount(0)

  await page.locator('text=Home').click()
  await expect(page).toHaveURL('http://localhost:3001/')

  await page.locator('[aria-label="account"]').click()
  await page.locator('text=Logout').click()

  await page.goBack()
  await expect(page).toHaveURL('http://localhost:3001/settings/edit-profile')

  // change Privage page ovleray to developlent and count to 1 to test locally
  await expect(page.locator('[data-id=PrivatePageOverlay]')).toHaveCount(0)
}
