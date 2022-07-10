import React from 'react'
import GoogleAdUnitUseweb, {
  GoogleAdUnitProps as GoogleAdUnitPropsUseweb,
} from '@useweb/ui/GoogleAdUnit'

import googleAdsConfig from '../../../../../services/google/googleAds/googleAds.config'
import isProductionSite from '../../../../utils/env/isProductionSite/isProductionSite'

export type GoogleAdUnitProps = Omit<GoogleAdUnitPropsUseweb, 'isProd' | 'dataAdClient'>

export default function GoogleAdUnit(props: GoogleAdUnitProps) {
  return (
    <GoogleAdUnitUseweb
      isProd={isProductionSite()}
      dataAdClient={googleAdsConfig.clientCaPub as any}
      {...props}
    />
  )
}
