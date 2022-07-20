import React from 'react'
import Head from 'next/head'

import HomeContent from '../../pagesContent/Home/Home'
import { HomeProvider } from '../../pagesContent/Home/useHomeProps/useHomeProps'
import getrootLayoutData from '../../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../../lib/layouts/Root/RootLayout'

export type HomeProps = {
  rootLayoutData: RootLayoutProps,
}

export default function HomePage(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <RootLayout rootLayoutData={props.rootLayoutData}>
        <HomeProvider pageProps={props}>
          <HomeContent />
        </HomeProvider>
      </RootLayout>
    </>
  )
}

export async function getStaticProps({ params = {}, previewData }) {
  const rootLayoutData = await getrootLayoutData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
}
