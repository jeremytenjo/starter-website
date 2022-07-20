import React from 'react'

import getRootData from '../data/_root/getRootData/getRootData'
import HomeContent from '../pagesContent/Home/Home'
import { HomePropsProvider } from '../pagesContent/Home/useHomeProps/useHomeProps'
import RootLayout, { type RootLayoutProps } from '../lib/layouts/Root/RootLayout'

export type HomeProps = {
  rootLayoutData: RootLayoutProps
}

export default function HomePage(props: HomeProps) {
  return (
    <>
      <RootLayout rootLayoutData={props.rootLayoutData}>
        <HomePropsProvider pageProps={props}>
          <HomeContent />
        </HomePropsProvider>
      </RootLayout>
    </>
  )
}

export async function getStaticProps({ previewData }): Promise<{ props: HomeProps }> {
  const rootLayoutData: RootLayoutProps = await getRootData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
}
