import prismicClient from '../../../lib/integrations/prismic/utils/prismicClient/prismicClient'
import type BlogSchema from '../blog.schema'

export default async function getBlogs({ previewData = {} } = {}) {
  const blogs: BlogSchema[] = (await prismicClient({
    previewData,
  }).getAllByType('blog')) as BlogSchema[]

  return blogs
}
