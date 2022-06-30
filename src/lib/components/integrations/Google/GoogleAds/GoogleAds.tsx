import React from 'react'

import googleAdsConfig from '../../../../../services/google/googleAds/googleAds.config'

import GoogleAdsHeadScript from './GoogleAdsHeadScript/GoogleAdsHeadScript'

export default function GoogleAds() {
  const addScript = process.env.NODE_ENV === 'production' && googleAdsConfig.clientCaPub

  return (
    <>{addScript && <GoogleAdsHeadScript clientCaPub={googleAdsConfig.clientCaPub} />}</>
  )
}
