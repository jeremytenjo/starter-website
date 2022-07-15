import React from 'react'

import appConfig from '../../../../../../app.config.cjs'
import { useRootLayoutData } from '../../../../layouts/Root/RootLayout'
import Link, { type LinkProps } from '../Link/Link'
import Image from '../Image/Image'

export type SiteLogoProps = {
  src?: string
  width?: string | number
  height?: string | number
  sx?: LinkProps['sx']
  onClick?: any
}

export default function SiteLogo({
  src,
  width = 164,
  height = 68,
  sx = {},
  onClick,
}: SiteLogoProps) {
  const rootData = useRootLayoutData()
  const siteLogo = src || rootData.settings.data.logo.url

  return (
    <Link href='/' data-id='Logo' sx={{ ...sx }} onClick={onClick}>
      <Image
        src={siteLogo}
        width={width}
        height={height}
        alt={`${appConfig.siteInfo.name} beautiful logo`}
      />
    </Link>
  )
}
