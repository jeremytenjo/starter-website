import prismicClient from '../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
import type ProductCategorySchema from '../productCategory/productCategory.schema'
import prismicConfig from '../../../services/prismic/prismic.config'

export default async function getProductCategories({ previewData = {} }) {
  if (!prismicConfig.accessToken) {
    console.log('Prismic config missing accessToken')
    return []
  }

  const productCategories: ProductCategorySchema[] = (await prismicClient({
    previewData,
  }).getAllByType('product-category')) as ProductCategorySchema[]

  return productCategories
}
