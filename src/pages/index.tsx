import React from 'react'

import getRootLayoutData from '../data/_root/getRootLayoutData/getRootLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'
import RootLayout, { type RootLayoutProps } from '../lib/layouts/Root/RootLayout'

export type HomePageProps = {
  rootLayoutData: RootLayoutProps
}

export default function HomePage(props: HomePageProps) {
  return (
    <>
      <RootLayout {...props.rootLayoutData}>
        <HomePagePropsProvider pageProps={props}>
          <HomePageContent />
        </HomePagePropsProvider>
      </RootLayout>
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
