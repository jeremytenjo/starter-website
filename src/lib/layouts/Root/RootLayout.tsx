import React from 'react'
import Box from '@useweb/ui/Box'

import RootHeader from './containers/RootHeader/RootHeader'
import RootFooter from './containers/RootFooter/RootFooter'

export type RootLayoutProps = {
  children: any
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Wrapper>
      <RootHeader />
      {children}
      <RootFooter />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='RootLayout'
      sx={{
        p: '20px',
      }}
    >
      {children}
    </Box>
  )
}
