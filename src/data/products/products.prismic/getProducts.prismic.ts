import prismicClient from '../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import type ProductSchema from '../product.schema'

export default async function getProducts({ previewData = {} } = {}) {
  const products: ProductSchema[] = (await prismicClient({
    previewData,
  }).getAllByType('product')) as ProductSchema[]

  return products
}
