import dotenv from 'dotenv'
import * as Figma from 'figma-api'

import assert from '../../../../src/lib/utils/misc/assert/assert.js'

dotenv.config({ path: '.env.local' })

export default async function figmaToCode() {
  const personalAccessToken: string = process.env.FIGMA_API_PERSONAL_ACCESS_TOKEN as any

  assert({
    condition: Boolean(personalAccessToken),
    message: 'Missing FIGMA_API_PERSONAL_ACCESS_TOKEN in .env.local',
  })

  const api = new Figma.Api({
    personalAccessToken,
  })

  const file = await api.getFile('my file key')
}
