import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import * as gtag from '../gtag/gtag'

function useGoogleAnalyticsPageView({ measurementId }) {
  const router = useRouter()

  useEffect(() => {
    if (measurementId) {
      const handleRouteChange = (url) => {
        gtag.gTagPageview({ url })
      }

      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])
}

export default function GoogleAnalyticsScripts({ measurementId }) {
  useGoogleAnalyticsPageView({ measurementId })

  return measurementId ? (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            const isHayleTenjoCom = window.location.href.includes('https://hayletenjo.com/')
            const disableGtag = !isHayleTenjoCom
            window['ga-disable-${measurementId}'] = disableGtag;

            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  ) : null
}
