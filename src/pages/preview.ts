import { setPreviewData, redirectToPreviewURL } from '@prismicio/next'

import prismicClient from '../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import linkResolver from '../lib/integrations/Prismic/utils/linkResolver/linkResolver'

export default async (req, res) => {
  const client = prismicClient({ req })

  await setPreviewData({ req, res })

  await redirectToPreviewURL({ req, res, client, linkResolver })
}
