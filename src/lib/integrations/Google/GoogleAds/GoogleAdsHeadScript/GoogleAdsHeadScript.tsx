import React from 'react'
import Script from 'next/script'

export type GoogleAdsHeadScriptProps = { clientCaPub: string | undefined }

export default function GoogleAdsHeadScript({ clientCaPub }: GoogleAdsHeadScriptProps) {
  return (
    <>
      <Script
        id='Adsense-id'
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${clientCaPub}`}
        strategy='afterInteractive'
        crossOrigin='anonymous'
        async
      />
    </>
  )
}
