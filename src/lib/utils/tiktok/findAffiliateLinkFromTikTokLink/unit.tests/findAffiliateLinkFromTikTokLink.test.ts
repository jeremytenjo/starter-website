// https://vitest.dev/api/
import { expect, test } from 'vitest'

import productStubs from '../../../../../data/products/products.stubs'
import findLinkFromTikTokLink from '../findAffiliateLinkFromTikTokLink'

test('Find Affiliate Link From TikTok Link - success', () => {
  const testData = productStubs
  const tikTokLink = productStubs[1].data.tikTokLink as string
  const result = findLinkFromTikTokLink({ data: testData, tikTokLink })
  const expected = productStubs[1].data.affiliateLinkCA

  expect(result).toBe(expected)
})
