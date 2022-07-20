import React from 'react'
import Head from 'next/head'

import HomeTestContent from '../../pagesContent/HomeTest/HomeTest'
import { HomeTestProvider } from '../../pagesContent/HomeTest/useHomeTestProps/useHomeTestProps'
import getrootLayoutData from '../../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../../lib/layouts/Root/RootLayout'

export type HomeTestProps = {
  rootLayoutData: RootLayoutProps,
}

export default function HomeTestPage(props: HomeTestProps) {
  return (
    <>
      <Head>
        <title>HomeTest</title>
      </Head>

      <RootLayout rootLayoutData={props.rootLayoutData}>
        <HomeTestProvider pageProps={props}>
          <HomeTestContent />
        </HomeTestProvider>
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
