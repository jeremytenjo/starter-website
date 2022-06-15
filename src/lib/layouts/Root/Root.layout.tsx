import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import Header, { type HeaderProps } from '../../components/Header/Header'

export type RootLayoutProps = {
  children: any
  rootLayoutData: { headerProps: HeaderProps }
}

export default function RootLayout({
  children,
  rootLayoutData = { headerProps: { products: [], navLinks: [] } },
}: RootLayoutProps) {
  return (
    <Wrapper>
      <Header {...rootLayoutData.headerProps} />
      {children}
      <Footer />
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

const Footer = ({}) => {
  return (
    <Box
      sx={{
        m: '0 auto',
        mt: '250px',

        maxWidth: '700px',
        display: 'block',
      }}
    >
      <Text
        text={`Created by Jeremy Tenjo. All Rights Reserved.`}
        sx={{ color: 'grey.two', textAlign: 'center', fontSize: '14px' }}
      />
    </Box>
  )
}
