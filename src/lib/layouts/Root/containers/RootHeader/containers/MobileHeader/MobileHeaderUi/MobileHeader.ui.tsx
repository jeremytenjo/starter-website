import React from 'react'
import Box from '@mui/material/Box'

import Menu from './Menu/Menu'
import Logo from './Logo/Logo'

export default function MobileHeaderUi() {
  return (
    <Wrapper>
      <Inner>
        <Logo />
        <Menu />
      </Inner>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='MobileHeader'
      sx={{
        display: {
          xs: 'grid',
          md: 'none',
        },
        pb: '20px',
        gap: '12px',
      }}
    >
      {children}
    </Box>
  )
}

const Inner = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Box>
  )
}
