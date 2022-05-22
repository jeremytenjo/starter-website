import React, { createContext, useContext } from 'react'

import type ProductCategorySchema from '../../../data/products/productCategory/productCategory.schema'
import type ProductSchema from '../../../data/products/product.schema'

export type CategoryIdPropsTypes = {
  productCategory: ProductCategorySchema
  categoryProducts: ProductSchema[]
}

export const CategoryIdPropsContext = createContext<CategoryIdPropsTypes>(null as any)

export const CategoryIdPropsProvider = ({ children, pageProps }) => {
  return (
    <CategoryIdPropsContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </CategoryIdPropsContext.Provider>
  )
}

const useCategoryIdProps = () => useContext(CategoryIdPropsContext)

export default useCategoryIdProps
