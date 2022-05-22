import React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import type ProductCategoriesSchema from '../../data/products/productCategory/productCategory.schema.jsx'
import appConfig from '../../../app.config.cjs'
import CategoryIdContent from '../../content/CategoryId/CategoryId'
import { CategoryIdPropsProvider } from '../../content/CategoryId/useCategoryIdProps/useCategoryIdProps'
import getProductCategoriesUrlId from '../../data/products/productCategory/getProductCategoryUrlId/getProductCategoryUrlId'
import getProductCategories from '../../data/products/productCategory/productCategories.api/getProductCategories'
import getMainLayoutData from '../../data/getMainLayoutData/getMainLayoutData'
import MainLayout from '../../lib/layouts/MainLayout/MainLayout'
import getProducts from '../../data/products/products.api/getProducts'

export type CategoryIdProps = {
  productCategory: ProductCategoriesSchema
  productCategories: ProductCategoriesSchema[]
  mainLayoutData: any
}

export default function CategoryIdPage(props: CategoryIdProps) {
  const categoryId = getProductCategoriesUrlId({ category: props.productCategory })
  const url = `${appConfig.siteInfo.domain}/categories/${categoryId}`
  const title = `${props.productCategory.data.name} | ${appConfig.siteInfo.name}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta
          property='og:description'
          content={`${props.productCategory.data.name} products`}
        />
        <meta
          property='og:image'
          content={props.productCategory.data.backgroundImage.url}
        />
        <meta
          property='og:image:alt'
          content={`${props.productCategory.data.name} cover image`}
        />
      </Head>

      <MainLayout {...props.mainLayoutData}>
        <CategoryIdPropsProvider pageProps={props}>
          <CategoryIdContent />
        </CategoryIdPropsProvider>
      </MainLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
  const mainLayoutData = await getMainLayoutData({ previewData })
  const products = await getProducts({ previewData })
  const categories = await getProductCategories({ previewData })
  const productCategory = categories.find(
    (category) => getProductCategoriesUrlId({ category }) === params?.categoryId,
  )
  const categoryProducts = products.filter((p) => {
    return p.data.category.id === productCategory?.id
  })

  return {
    props: {
      mainLayoutData,
      productCategory,
      categoryProducts,
    },
  }
}

export const getStaticPaths = async ({ previewData }: any) => {
  const categories = await getProductCategories({ previewData })

  const paths = categories.map((category) => {
    const categoryId = getProductCategoriesUrlId({ category })

    return {
      params: {
        categoryId,
        categories,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
