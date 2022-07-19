import React from 'react'

import getRootData from '../data/_root/getRootData/getRootData'
import HomePageContent from '../pagesCcontent/HomePage/HomePage'
import { HomePagePropsProvider } from '../pagesCcontent/HomePage/useHomePageProps/useHomePageProps'
import RootLayout, { type RootLayoutProps } from '../lib/layouts/Root/RootLayout'

export type HomePageProps = {
  rootLayoutData: RootLayoutProps
}

export default function HomePage(props: HomePageProps) {
  return (
    <>
      <RootLayout rootLayoutData={props.rootLayoutData}>
        <HomePagePropsProvider pageProps={props}>
          <HomePageContent />
        </HomePagePropsProvider>
      </RootLayout>
    </>
  )
}

export async function getStaticProps({ previewData }): Promise<{ props: HomePageProps }> {
  const rootLayoutData: RootLayoutProps = await getRootData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
}
