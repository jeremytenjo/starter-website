import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CacheProvider } from '@emotion/react'

// import ClickToComponent from '../lib/components/ClickToComponent/ClickToComponent'
import Theme from '../theme/theme'
import createEmotionCache from '../theme/mui/utils/createEmotionCache'
import RootLayout from '../content/_Root/Root.layout'
import GoogleAnalytics from '../services/googleAnalytics/GoogleAnalytics'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <>
      {/* <ClickToComponent /> */}

      <CacheProvider value={emotionCache}>
        <GoogleAnalytics />

        <Head>
          <meta
            name='description'
            content='A starter to create engaging and performant websites'
          />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='author' content='Jeremy Tenjo' />
          {/* vercel staging sites will always have no index */}
          <meta name='robots' content='index, follow' />
        </Head>

        <Theme>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
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
