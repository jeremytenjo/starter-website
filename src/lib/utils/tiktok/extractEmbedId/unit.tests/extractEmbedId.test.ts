// https://vitest.dev/api/
import { expect, test } from 'vitest'

import extractEmbedId from '../extractEmbedId'

test('Find Affiliate Link From TikTok Link - success', () => {
  const tikTokLink =
    '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@lexthetransformer/video/6817918978564967685" data-video-id="6817918978564967685" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@lexthetransformer" href="https://www.tiktok.com/@lexthetransformer">@lexthetransformer</a> These Goli ACV gummies are changing my life. Helps curb appetite, enhance energy, etc.!  <a title="golinutrition" target="_blank" href="https://www.tiktok.com/tag/golinutrition">#golinutrition</a> <a title="ad" target="_blank" href="https://www.tiktok.com/tag/ad">#ad</a> <a title="review" target="_blank" href="https://www.tiktok.com/tag/review">#review</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp">#fyp</a> <a title="applecidervinegar" target="_blank" href="https://www.tiktok.com/tag/applecidervinegar">#applecidervinegar</a> <a target="_blank" title="♬ Silence (feat. Khalid) - Marshmello" href="https://www.tiktok.com/music/Silence-feat-Khalid-6456618827147905805">♬ Silence (feat. Khalid) - Marshmello</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>'
  const result = extractEmbedId({ tiktokEmbedCode: tikTokLink })
  const expected = 'https://www.tiktok.com/@lexthetransformer/video/6817918978564967685'

  expect(result).toBe(expected)
})
