import productsStubs from '../products.stubs'
import type ProductsSchema from '../products.schema'

import getData from '@/lib/utils/data/getData/getData'

type GetProductsProps = {
  previewData: any
}

export default async function getProducts({ previewData }: GetProductsProps) {
  const getFn = () => getProductsFromApi({ previewData })

  const products: ProductsSchema[] = await getData({
    stubs: productsStubs,
    getFn,
  })

  return products
}

const getProductsFromApi = async ({ previewData }) => {
  const products: ProductsSchema[] = []
  // TODO get products from api

  return products
}
