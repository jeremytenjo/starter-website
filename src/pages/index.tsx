import React from 'react'
import Textfield from '@useweb/ui/Textfield'

import getrootLayoutData from '../data/getRootLayoutData/getRootLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'
import getProductCategories from '../data/products/productCategory/productCategories.api/getProductCategories'
import getPopularProducts from '../data/products/popularProducts/getPopularProducts/getPopularProducts'

export default function HomePage(props) {
  console.log({ Textfield })
  return (
    <>
      <HomePagePropsProvider pageProps={props}>
        <HomePageContent />
      </HomePagePropsProvider>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const rootLayoutData = await getrootLayoutData({ previewData })
  const productCategories = await getProductCategories({ previewData })
  const popularProducts = await getPopularProducts({ previewData })

  return {
    props: {
      rootLayoutData,
      productCategories,
      popularProducts,
    },
  }
}
