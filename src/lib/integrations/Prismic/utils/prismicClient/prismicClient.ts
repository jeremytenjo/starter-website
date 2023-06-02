import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

import prismicConfig from '../../prismic.config'

type CreateClientProps = {
  previewData?: any
  req?: any
}

// https://prismic.io/docs/technologies/setup-nextjs#configure-prismic
// This factory function allows smooth preview setup

/**
 * [Docs](https://prismic.io/docs/technical-reference/prismicio-client#usage)
 */
export default function prismicClient(props: CreateClientProps = {}): prismic.Client {
  const client = prismic.createClient(prismicConfig.apiEndpoint, {
    ...(props as any),
    accessToken: prismicConfig.accessToken,
  })

  enableAutoPreviews({
    client,
    previewData: props.previewData,
    req: props.req,
  })

  return client
}
