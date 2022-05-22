import prismicClient from '../../../lib/utils/prismic/prismicClient/prismicClient'
import type ProductCategorySchema from '../productCategory/productCategory.schema'

export default async function getProductCategories({ previewData = {} }) {
  const productCategories: ProductCategorySchema[] = (await prismicClient({
    previewData,
  }).getAllByType('product-category')) as ProductCategorySchema[]

  return productCategories
}
