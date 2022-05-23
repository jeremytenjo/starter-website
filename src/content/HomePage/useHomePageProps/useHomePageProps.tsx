import React, { createContext, useContext } from 'react'

import type ProductCategoriesSchema from '../../../data/products/productCategory/productCategory.schema'
import type ProductSchema from '../../../data/products/product.schema'

export type HomePagePropsTypes = {
  productCategories: ProductCategoriesSchema[]
  popularProducts: ProductSchema[]
}

export const HomePagePropsContext = createContext<HomePagePropsTypes>(null as any)

export const HomePagePropsProvider = ({ children, pageProps }) => {
  return (
    <HomePagePropsContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </HomePagePropsContext.Provider>
  )
}

const useHomePageProps = () => useContext(HomePagePropsContext)

export default useHomePageProps
