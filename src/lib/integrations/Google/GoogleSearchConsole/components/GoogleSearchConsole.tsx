import React from 'react'
import Head from 'next/head'

import googleSearchConsoleConfig from '../../../../../services/google/googleSearchConsole/googleSearchConsole.config'

export default function GoogleSearchConsole() {
  return googleSearchConsoleConfig.googleSiteVerification ? (
    <Head>
      <meta
        name='google-site-verification'
        content={googleSearchConsoleConfig.googleSiteVerification}
      />
    </Head>
  ) : (
    <>
      {console.log(
        'Missing google-site-verification - https://search.google.com/search-console',
      )}
      {}
    </>
  )
}
