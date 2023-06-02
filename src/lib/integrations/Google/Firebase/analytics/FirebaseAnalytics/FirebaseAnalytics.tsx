import React from 'react'
import Script from 'next/script'
import { useGaPageView } from '../events/gaPageView/gaPageView'
import firebaseConfig from '../../firebase.config'
import appConfig from '../../../../../../../app.config.cjs'

const isDev = process.env.NODE_ENV == 'development'

export default function FirebaseAnalytics() {
  useGaPageView()

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${firebaseConfig.measurementId}`}
      />

      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];

        const isProductionWebsite = window.location.href.includes('${
          appConfig.siteInfo.domain
        }') || window.location.href.includes('${appConfig.siteInfo.previewDomain}')
        const disableGtag = !isProductionWebsite

        if (disableGtag) {
          window['ga-disable-${firebaseConfig.measurementId}'] = '${
            isDev ? 'false' : 'true'
          }';
        }

        function gtag(){dataLayer.push(arguments);}
        gtag('config', '${firebaseConfig.measurementId}',{
          send_page_view: true
        });
      `,
        }}
      />
    </>
  )
}
