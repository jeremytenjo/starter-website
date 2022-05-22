import type ProductCategorySchema from '../productCategory.schema'

type GetProductCategoryUrlIdProps = {
  category: ProductCategorySchema
}

export default function getProductCategoriesUrlId({
  category,
}: GetProductCategoryUrlIdProps) {
  const productIsDefined = !!category?.data

  if (!productIsDefined) {
    console.log('getProductCategoriesUrlId', false)
    return ''
  }

  const productUrlIdSplit = category.data.name.split(' ')
  const productUrlIdMap = productUrlIdSplit.map((text) => text.toLocaleLowerCase())
  const productUrlId = productUrlIdMap.join('-')

  return productUrlId
}
