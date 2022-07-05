import React from 'react'

import getrootLayoutData from '../data/_root/getRootLayoutData/getRootLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'
import getProductCategories from '../data/products/productCategory/productCategories.api/getProductCategories'
import getPopularProducts from '../data/products/popularProducts/getPopularProducts/getPopularProducts'

export default function HomePage(props) {
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
