import React from 'react'
import Box from '@useweb/ui/Box'

import MobileHeader from './containers/MobileHeader/MobileHeader'
import DesktopHeader from './containers/DesktopHeader/DesktopHeader'

export default function RootHeader() {
  return (
    <Wrapper>
      <MobileHeader />
      <DesktopHeader />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return <Box data-id='Header'>{children}</Box>
}
