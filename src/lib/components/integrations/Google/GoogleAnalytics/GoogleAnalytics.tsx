import React from 'react'

import googleAnalyticsConfig from '../../../../../services/googleAnalytics/googleAnalytics.config'

import GoogleAnalyticsScripts from './GoogleAnalyticsScripts/GoogleAnalyticsScripts'

export default function GoogleAnalytics() {
  return (
    <>
      <GoogleAnalyticsScripts measurementId={googleAnalyticsConfig.measurementId} />
    </>
  )
}
