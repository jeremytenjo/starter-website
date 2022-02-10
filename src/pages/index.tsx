import React from 'react'
import Head from 'next/head'

import HomePageContent from '../content/HomePage/HomePage'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Website starter</title>
      </Head>

      <HomePageContent />
    </>
  )
}
