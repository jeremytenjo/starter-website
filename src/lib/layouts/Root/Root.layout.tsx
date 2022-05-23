import React from 'react'
import Box from '@mui/material/Box'

import appConfig from '../../../../app.config.cjs'
import Header, { type HeaderProps } from '../../components/Header/Header'
import Text from '../../components/Text/Text'

export type RootLayoutProps = {
  children: any
  rootLayoutData: { headerProps: HeaderProps }
}

export default function RootLayout({ children, rootLayoutData }: RootLayoutProps) {
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
        text={`${appConfig.siteInfo.domain} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to (“${appConfig.siteInfo.domain}” (amazon.com, or endless.com, MYHABIT.com, SmallParts.com, or AmazonWireless.com).`}
        sx={{ color: 'grey.two', textAlign: 'center', fontSize: '14px' }}
      />
    </Box>
  )
}
