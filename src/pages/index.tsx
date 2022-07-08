import React from 'react'

import getRootLayoutData from '../data/_root/getRootLayoutData/getRootLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'
import type { RootLayoutProps } from '../lib/layouts/Root/RootLayout'

export type HomePageProps = {
  rootLayoutData: RootLayoutProps
}

export default function HomePage(props: HomePageProps) {
  return (
    <>
      <HomePagePropsProvider pageProps={props}>
        <HomePageContent />
      </HomePagePropsProvider>
    </>
  )
}

export async function getStaticProps({ previewData }): Promise<{ props: HomePageProps }> {
  const rootLayoutData: RootLayoutProps = await getRootLayoutData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
}
