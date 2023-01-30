import { test } from '@playwright/test'
import { invalidEmail } from './signinfail.test.js'
import signinForm from './signinForm.test.js'

test('successfully sign in', async ({ page }) => {
  await signinForm({ page })
})

test('error with invalid email', async ({ page }) => {
  await invalidEmail({ page })
})
