import React from 'react'
import Link, { type LinkProps } from '@useweb/ui/Link'
import Image, { type ImageProps } from '@useweb/ui/Image'

import appConfig from '../../../../../../app.config'
import { useRootLayoutData } from '../../../../layouts/Root/RootLayout'

export type SiteLogoProps = Omit<ImageProps, 'alt'> & {
  src?: string
  sx?: LinkProps['sx']
  onClick?: any
}

export default function SiteLogo({
  src,
  width = 182,
  height = 44,
  sx = {},
  onClick,
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
      />
    </Link>
  )
}
