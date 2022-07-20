import React from 'react'
import Box from '@useweb/ui/Box'

export type HeaderProps = { name: string }

export default function Header(props: HeaderProps) {
  return (
    <Wrapper>
      Header
      <DesktopHeader {...props} />
      <MobileHeader {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Header' sx={{}}>
      {children}
    </Box>
  )
}

const DesktopHeader = (props: HeaderProps) => {
  return (
    <Box data-id='DesktopHeader' sx={{}}>
      DesktopHeader
    </Box>
  )
}

const MobileHeader = (props: HeaderProps) => {
  return (
    <Box data-id='MobileHeader' sx={{}}>
      MobileHeader
    </Box>
  )
}
