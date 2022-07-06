import React from 'react'

import getrootLayoutData from '../data/_root/getRootLayoutData/getRootLayoutData'
import HomePageContent from '../content/HomePage/HomePage'
import { HomePagePropsProvider } from '../content/HomePage/useHomePageProps/useHomePageProps'

export default function HomePage(props) {
  return (
    <>
      <HomePagePropsProvider pageProps={props}>
        <HomePageContent />
      </HomePagePropsProvider>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const rootLayoutData = await getrootLayoutData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
}
