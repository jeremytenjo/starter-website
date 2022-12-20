import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'

import appConfig from '../../app.config'
import ClickToComponent from '../lib/components/useweb/ClickToComponent/ClickToComponent'
import Theme from '../theme/theme'
import createEmotionCache from '../theme/UiTheme/utils/createEmotionCache'
import GoogleAnalytics from '../lib/integrations/Google/GoogleAnalytics/GoogleAnalytics'
import GoogleAds from '../lib/integrations/Google/GoogleAds/GoogleAds'
import GoogleSearchConsole from '../lib/integrations/Google/GoogleSearchConsole/components/GoogleSearchConsole'
// import Prismic from '../lib/integrations/Prismic/Prismic'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <ClickToComponent />
      <GoogleSearchConsole />
      <GoogleAnalytics />
      <GoogleAds />

      <Head>
        <meta property='og:image:alt' content={`${appConfig.siteInfo.name} logo`} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='author' content='Jeremy Tenjo' />
        {/* vercel staging sites will always have no index */}
        <meta name='robots' content='index, follow' />
        <title>{appConfig.siteInfo.title}</title>
        <meta name='description' content={appConfig.siteInfo.description} />
        <meta property='og:url' content={appConfig.siteInfo.domain} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={appConfig.siteInfo.title} />
        <meta property='og:description' content={appConfig.siteInfo.description} />
        <meta
          property='og:image'
          content={`${appConfig.siteInfo.domain}/images/logo/logo.svg`}
        />
      </Head>
      <CacheProvider value={emotionCache}>
        <Theme>
          {/* <Prismic> */}
          <SnackbarProvider>
            <Component {...pageProps} />
          </SnackbarProvider>
          {/* </Prismic> */}
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
