import React from 'react'

import getRootData from '../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../lib/layouts/Root/RootLayout'
import { HomePropsProvider } from '../pagesContent/Home/useHomeProps/useHomeProps'

export default async function AppLayout({ children, previewData }) {
  const rootLayoutData: RootLayoutProps = await getRootData({ previewData })

  return (
    <RootLayout rootLayoutData={rootLayoutData}>
      <HomePropsProvider pageProps={rootLayoutData}>{children}</HomePropsProvider>
    </RootLayout>
  )
}
