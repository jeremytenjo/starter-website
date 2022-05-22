import type ProductSchema from '../../product.schema'

type GetProductUrlIdProps = {
  product: ProductSchema
}

export default function getProductUrlId({ product }: GetProductUrlIdProps) {
  const productIsDefined = !!product?.data

  if (!productIsDefined) {
    return ''
  }

  const productUrlIdSplit = product.data.name.split(' ')
  const productUrlIdMap = productUrlIdSplit.map((text) => text.toLocaleLowerCase())
  const productUrlId = productUrlIdMap.join('-')

  return productUrlId
}
