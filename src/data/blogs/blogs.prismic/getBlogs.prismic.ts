import prismicClient from '../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import type BlogSchema from '../blog.schema'
import prismicConfig from '../../../services/prismic/prismic.config'

export type GetBlogsFromPrismicProps = any

export default async function getBlogs({ previewData = {} } = {}) {
  if (!prismicConfig.accessToken) {
    console.log('Prismic config missing accessToken')
    return []
  }

  const blogs: BlogSchema[] = (await prismicClient({
    previewData,
  }).getAllByType('blog')) as BlogSchema[]

  return blogs
}
