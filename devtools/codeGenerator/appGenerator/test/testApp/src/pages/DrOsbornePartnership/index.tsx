import React from 'react'
import Head from 'next/head'

import DrOsbornePartnershipContent from '../../pagesContent/DrOsbornePartnership/DrOsbornePartnership'
import { DrOsbornePartnershipProvider } from '../../pagesContent/DrOsbornePartnership/useDrOsbornePartnershipProps/useDrOsbornePartnershipProps'
import getrootLayoutData from '../../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../../lib/layouts/Root/RootLayout'

export type DrOsbornePartnershipProps = {
  rootLayoutData: RootLayoutProps,
}

export default function DrOsbornePartnershipPage(props: DrOsbornePartnershipProps) {
  return (
    <>
      <Head>
        <title>DrOsbornePartnership</title>
      </Head>

      <RootLayout rootLayoutData={props.rootLayoutData}>
        <DrOsbornePartnershipProvider pageProps={props}>
          <DrOsbornePartnershipContent />
        </DrOsbornePartnershipProvider>
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
