import React from 'react'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import appConfig from '../../../app.config.cjs'
import type ProductSchema from '../../data/products/product.schema'
import getProducts from '../../data/products/products.api/getProducts'
import ProductIdPageContent from '../../content/ProductIdPage/ProductIdPage'
import getProductUrlId from '../../data/products/utils/getProductUrlId/getProductUrlId'
import { ProductIdPagePropsProvider } from '../../content/ProductIdPage/ProductIdPageProps/useProductIdPageProps'
import getrootLayoutData from '../../data/getrootLayoutData/getrootLayoutData'

export type ProductIdPageProps = {
  product: ProductSchema
  products: ProductSchema[]
  rootLayoutData: any
}

export default function ProductIdPage(props: ProductIdPageProps) {
  const productId = getProductUrlId({ product: props.product })
  const url = `${appConfig.siteInfo.domain}/products/${productId}`
  const title = `${props.product.data.name} | ${appConfig.siteInfo.name}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:url' content={url} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={`${props.product.data.Description}`} />
        <meta property='og:image' content={props.product.data.image.url} />
        <meta
          property='og:image:alt'
          content={`${props.product.data.name} cover image`}
        />
      </Head>

      <ProductIdPagePropsProvider pageProps={props}>
        <ProductIdPageContent />
      </ProductIdPagePropsProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
  const rootLayoutData = await getrootLayoutData({ previewData })
  const products = await getProducts({ previewData })
  const product = products.find(
    (product) => getProductUrlId({ product }) === params?.productId,
  )
  const similarProducts = products.filter((r) => {
    return r.data.category.slug === product?.data.category.slug && r.id !== product.id
  })

  return {
    props: {
      product,
      products,
      similarProducts,
      rootLayoutData,
    },
  }
}

export const getStaticPaths = async ({ previewData }: any) => {
  const products = await getProducts({ previewData })

  const paths = products.map((product) => {
    const productId = getProductUrlId({ product })

    return {
      params: {
        productId,
        products,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
