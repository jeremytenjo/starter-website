import React from 'react'
import Head from 'next/head'

import SettingsContent from '../../pagesContent/Settings/Settings'
import { SettingsProvider } from '../../pagesContent/Settings/useSettingsProps/useSettingsProps'
import getrootLayoutData from '../../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../../lib/layouts/Root/RootLayout'

export type SettingsProps = {
  rootLayoutData: RootLayoutProps,
}

export default function SettingsPage(props: SettingsProps) {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <RootLayout rootLayoutData={props.rootLayoutData}>
        <SettingsProvider pageProps={props}>
          <SettingsContent />
        </SettingsProvider>
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
