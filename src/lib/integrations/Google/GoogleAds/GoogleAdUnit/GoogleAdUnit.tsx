import React from 'react'
import type { GoogleAdUnitProps as GoogleAdUnitPropsUseweb } from '@useweb/ui/GoogleAdUnit'
import GoogleAdUnitUseweb from '@useweb/ui/GoogleAdUnit'

import googleAdsConfig from '../googleAds.config'
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
