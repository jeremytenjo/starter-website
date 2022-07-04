import blogsStubs from '../blogs.stubs'
import type BlogSchema from '../blog.schema'
import getData from '../../../lib/utils/data/getData/getData'
import getBlogsFromPrismic from '../blogs.prismic/getBlogs.prismic'

export default async function getBlogs({ previewData = {} } = {}) {
  const getFn = () => getBlogsFromApi({ previewData })

  const blogs: BlogSchema[] = await getData({
    stubs: blogsStubs,
    getFn,
  })

  return blogs
}

const getBlogsFromApi = async ({ previewData = {} } = {}) => {
  const blogs: BlogSchema[] = await getBlogsFromPrismic({ previewData })

  return blogs
}
