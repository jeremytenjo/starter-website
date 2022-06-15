import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/LinkNext'
import Image from 'next/image'

import IconTikTok from '../icons/IconTikTok'

export default function ComingSoon() {
  return (
    <>
      <Wrapper>
        <Logo />
        <Desc />
        <Title />
      </Wrapper>
      <Socials />
    </>
  )
}

const Wrapper = ({ children }) => {
  return <Box>{children}</Box>
}

const Logo = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        justifyContent: 'center',
        mb: '40px',
        mt: '40px',
      }}
    >
      <Image src='/images/logo/logo.svg' width={300} height={300} alt='onlyfindz logo' />
    </Box>
  )
}

const Desc = () => {
  return (
    <Box>
      <Text
        tag='h4'
        text='We find the best products for you. We aim to help you make the best shopping decisions'
        sx={{
          fontFamily: 'AlikeRegular',
          fontSize: {
            xs: '21px',
            lg: '25.76px',
          },
          textAlign: 'center',
          maxWidth: '600px',
          display: 'block',
          m: '0 auto',
          px: '10px',
          lineHeight: '25px',
          mb: {
            xs: '40px',
            lg: '50px',
          },
        }}
      />
    </Box>
  )
}

const Title = () => {
  return (
    <>
      <Text
        tag='h4'
        text='Coming Soon'
        sx={{
          fontFamily: 'AlikeRegular',
          fontSize: {
            xs: '25.76px',
            lg: '37px',
          },
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          mb: {
            xs: '24px',
            lg: '50px',
          },
        }}
      />
    </>
  )
}

const Socials = () => {
  return (
    <Box
      sx={{
        display: 'block',
        margin: '0 auto',
        width: 'fit-content',
        position: 'fixed',
        inset: 0,
        top: 'auto',
        bottom: '5px',
      }}
    >
      <Link newTab href='https://www.tiktok.com/@onlyfindz'>
        <IconTikTok
          sx={{
            fontSize: {
              xs: '24px',
              lg: '40px',
            },
          }}
        />
      </Link>
    </Box>
  )
}
