import prismicClient from '../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import type ProductSchema from '../product.schema'
import prismicConfig from '../../../services/prismic/prismic.config'

export default async function getProducts({ previewData = {} } = {}) {
  if (!prismicConfig.accessToken) {
    console.log('Prismic config missing accessToken')
    return []
  }

  const products: ProductSchema[] = (await prismicClient({
    previewData,
  }).getAllByType('product')) as ProductSchema[]

  return products
}
