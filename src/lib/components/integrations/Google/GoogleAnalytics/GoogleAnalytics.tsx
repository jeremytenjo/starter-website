import React from 'react'

import GoogleAnalyticsScripts from '../../../../utils/googleAnalytics/GoogleAnalyticsScripts/GoogleAnalyticsScripts'
import googleAnalyticsConfig from '../../../../../services/googleAnalytics/googleAnalytics.config'

export default function GoogleAnalytics() {
  return (
    <>
      <GoogleAnalyticsScripts measurementId={googleAnalyticsConfig.measurementId} />
    </>
  )
}
