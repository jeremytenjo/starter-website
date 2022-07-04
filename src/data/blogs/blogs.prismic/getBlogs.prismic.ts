import prismicClient from '../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import type BlogSchema from '../blog.schema'

export type GetBlogsFromPrismicProps = any

export default async function getBlogs({ previewData = {} } = {}) {
  const blogs: BlogSchema[] = (await prismicClient({
    previewData,
  }).getAllByType('blog')) as BlogSchema[]

  return blogs
}
