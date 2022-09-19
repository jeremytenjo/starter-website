import React from 'react'

import appConfig from '../../../../../../app.config'
import { useRootLayoutData } from '../../../../layouts/Root/RootLayout'
import Link, { type LinkProps } from '../Link/Link'
import Image, { type ImageProps } from '../Image/Image'

export type SiteLogoProps = {
  src?: string
  width?: string | number
  height?: string | number
  sx?: LinkProps['sx']
  onClick?: any
  layout?: ImageProps['layout']
  objectFit?: ImageProps['objectFit']
}

export default function SiteLogo({
  src,
  width = 182,
  height = 44,
  sx = {},
  onClick,
  layout,
  objectFit,
}: SiteLogoProps) {
  const rootData = useRootLayoutData()
  const siteLogo =
    src || rootData?.globalSettings?.data?.logo?.url || '/images/logo/logo-full.png'

  return (
    <Link
      href='/'
      data-id='SiteLogo'
      sx={{
        position: 'relative',
        ...sx,
      }}
      onClick={onClick}
    >
      <Image
        src={siteLogo}
        width={width}
        height={height}
        alt={`${appConfig.siteInfo.name} beautiful logo`}
        layout={layout}
        objectFit={objectFit}
      />
    </Link>
  )
}
