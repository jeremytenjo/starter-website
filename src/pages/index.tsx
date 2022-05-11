import React from 'react'
import Head from 'next/head'

import appconfig from '../../app.config.cjs'
import HomePageContent from '../content/HomePage/HomePage'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{appconfig.siteInfo.title}</title>
        <meta property='og:url' content={appconfig.siteInfo.domain} />
        <meta property='og:type' content='websitesss' />
        <meta property='og:title' content={appconfig.siteInfo.title} />
        <meta property='og:description' content={appconfig.siteInfo.description} />
        <meta
          property='og:image'
          content={`${appconfig.siteInfo.domain}/images/logo/logo.svg`}
        />
        <meta property='og:image:alt' content={`${appconfig.siteInfo.name} logo`} />
      </Head>

      <HomePageContent />
    </>
  )
}
