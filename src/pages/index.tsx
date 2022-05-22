import React from 'react'

import getMainLayoutData from '../data/getMainLayoutData/getMainLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'
import MainLayout from '../lib/layouts/MainLayout/MainLayout'
import getProductCategories from '../data/products/productCategory/productCategories.api/getProductCategories'
import getPopularProducts from '../data/products/getPopularProducts/getPopularProducts'

export default function HomePage(props) {
  return (
    <>
      <HomePagePropsProvider pageProps={props}>
        <MainLayout {...props.mainLayoutData}>
          <HomePageContent />
        </MainLayout>
      </HomePagePropsProvider>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const mainLayoutData = await getMainLayoutData({ previewData })
  const productCategories = await getProductCategories({ previewData })
  const popularProducts = await getPopularProducts({ previewData })

  return {
    props: {
      mainLayoutData,
      productCategories,
      popularProducts,
    },
  }
}
