import React from 'react'
import Box from '@useweb/ui/Box'

import RootHeader, { type RootHeaderProps } from './containers/RootHeader/RootHeader'
import RootFooter from './containers/RootFooter/RootFooter'

export type RootLayoutProps = {
  children: any
  rootLayoutData: { rootHeaderProps: RootHeaderProps }
}

export default function RootLayout({
  children,
  rootLayoutData = {
    rootHeaderProps: {
      navLinks: [],
      products: [],
    },
  },
}: RootLayoutProps) {
  return (
    <Wrapper>
      <RootHeader {...rootLayoutData.rootHeaderProps} />
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
