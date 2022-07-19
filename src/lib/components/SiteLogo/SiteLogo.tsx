import React from 'react'
import Box from '@useweb/ui/Box'

export type SiteLogoProps = { name: string }

export default function SiteLogo({ name = 'SiteLogo' }: SiteLogoProps) {
  return <Wrapper>{name}</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='SiteLogo' sx={{}}>
      {children}
    </Box>
  )
}
