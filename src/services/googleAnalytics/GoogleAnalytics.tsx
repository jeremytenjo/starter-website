import React from 'react'

import GoogleAnalyticsScripts from '../../lib/utils/googleAnalytics/GoogleAnalyticsScripts/GoogleAnalyticsScripts'

import googleAnalyticsConfig from './googleAnalytics.config'

export default function GoogleAnalytics() {
  return (
    <>
      <GoogleAnalyticsScripts measurementId={googleAnalyticsConfig.measurementId} />
    </>
  )
}
