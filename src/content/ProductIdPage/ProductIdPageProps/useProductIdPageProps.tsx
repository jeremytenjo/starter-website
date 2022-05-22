import React, { createContext, useContext } from 'react'

import type ProductSchema from '../../../data/products/product.schema'

export type ProductIdPagePropsTypes = {
  product: ProductSchema
  products: ProductSchema[]
  similarProducts: ProductSchema[]
}

export const ProductIdPagePropsContext = createContext<ProductIdPagePropsTypes>(
  null as any,
)

export const ProductIdPagePropsProvider = ({ children, pageProps }) => {
  return (
    <ProductIdPagePropsContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </ProductIdPagePropsContext.Provider>
  )
}

const useProductIdPageProps = () => useContext(ProductIdPagePropsContext)

export default useProductIdPageProps
