import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'

import appconfig from '../../app.config.cjs'
import ClickToComponent from '../lib/components/ClickToComponent/ClickToComponent'
import Theme from '../theme/theme'
import createEmotionCache from '../theme/mui/utils/createEmotionCache'
import RootLayout from '../lib/layouts/Root/Root.layout'
import GoogleAnalytics from '../lib/components/googleAnalytics/GoogleAnalytics'
import { SnackbarProvider } from '../lib/components/Snackbar/Snackbar'
import Prismic from '../lib/components/Prismic/Prismic'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <Head>
        <title>{appconfig.siteInfo.title}</title>
        <meta name='description' content={appconfig.siteInfo.description} />
        <meta property='og:url' content={appconfig.siteInfo.domain} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={appconfig.siteInfo.title} />
        <meta property='og:description' content={appconfig.siteInfo.description} />
        <meta
          property='og:image'
          content={`${appconfig.siteInfo.domain}/images/logo/logo.svg`}
        />
        <meta property='og:image:alt' content={`${appconfig.siteInfo.name} logo`} />
      </Head>

      <ClickToComponent />

      <CacheProvider value={emotionCache}>
        <GoogleAnalytics />

        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='author' content='Jeremy Tenjo' />
          {/* vercel staging sites will always have no index */}
          <meta name='robots' content='index, follow' />
        </Head>

        <Theme>
          <Prismic>
            <SnackbarProvider>
              <RootLayout {...pageProps}>
                <Component {...pageProps} />
              </RootLayout>
            </SnackbarProvider>
          </Prismic>
        </Theme>
      </CacheProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
