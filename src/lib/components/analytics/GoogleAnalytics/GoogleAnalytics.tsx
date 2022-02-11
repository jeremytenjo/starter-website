import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import googleAnalyticsConfig from './googleAnalytics.config'
import * as gtag from './gtag/gtag'

function useGoogleAnalyticsPageView() {
  const router = useRouter()

  useEffect(() => {
    if (googleAnalyticsConfig.measurementId) {
      const handleRouteChange = (url) => {
        gtag.pageview(url)
      }

      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])
}

export default function GoogleAnalytics() {
  useGoogleAnalyticsPageView()

  return googleAnalyticsConfig.measurementId ? (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.measurementId}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsConfig.measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  ) : null
}
