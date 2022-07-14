import React from 'react'

import appConfig from '../../../../../../app.config.cjs'
import { useRootLayoutData } from '../../../../layouts/Root/RootLayout'
import Link from '../Link/Link'
import Image from '../Image/Image'

export type SiteLogoProps = {
  src?: string
  width?: string | number
  height?: string | number
}

export default function SiteLogo({ src, width = 40, height = 40 }: SiteLogoProps) {
  const rootData = useRootLayoutData()
  const siteLogo = src || rootData?.settings?.data?.logo?.url || '/images/logo/logo.svg'

  return (
    <Link
      href='/'
      data-id='Logo'
      sx={{
        display: 'grid',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      <Image
        src={siteLogo}
        width={width}
        height={height}
        alt={`${appConfig.siteInfo.name} beautiful logo`}
      />
    </Link>
  )
}
