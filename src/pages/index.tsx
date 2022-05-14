import React from 'react'

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
