import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import { SnackbarProvider } from '@useweb/ui/Snackbar'

import appConfig from '../../app.config.cjs'
import ClickToComponent from '../lib/components/useweb/ClickToComponent/ClickToComponent'
import Theme from '../theme/theme'
import createEmotionCache from '../theme/UiTheme/utils/createEmotionCache'
import FirebaseAnalytics from '../lib/integrations/Google/Firebase/analytics/FirebaseAnalytics/FirebaseAnalytics'
// import GoogleAds from '../lib/integrations/Google/GoogleAds/GoogleAds'
import GoogleSearchConsole from '../lib/integrations/Google/GoogleSearchConsole/components/GoogleSearchConsole'
import Firebase from '../lib/integrations/Google/Firebase/firebase'
import GlobalErrorLogger from '../lib/utils/loggers/logError/GlobalErrorLogger/GlobalErrorLogger'
// import Prismic from '../lib/integrations/Prismic/Prismic'
// import AuthUserSetterMounter from '../lib/components/AuthUserSetter/AuthUserSetterMounter'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      <ClickToComponent />
      <GoogleSearchConsole />
      <FirebaseAnalytics />
      {/* <GoogleAds /> */}

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

      <GlobalErrorLogger>
        <Firebase>
          <CacheProvider value={emotionCache}>
            <Theme>
              {/* <Prismic> */}
              <SnackbarProvider>
                {/* <AuthUserSetterMounter /> */}
                <Component {...pageProps} />
              </SnackbarProvider>
              {/* </Prismic> */}
            </Theme>
          </CacheProvider>
        </Firebase>
      </GlobalErrorLogger>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
