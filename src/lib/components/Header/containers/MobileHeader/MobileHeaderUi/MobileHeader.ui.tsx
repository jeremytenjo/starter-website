import React from 'react'
import Box from '@mui/material/Box'

import Text from '../../../../Text/Text'

import Menu from './Menu/Menu'
import Logo from './Logo/Logo'
import SearchBar from './SearchBar/SearchBar'

export default function MobileHeaderUi({ links, onShowSearchBarClick }) {
  return (
    <Wrapper>
      <Inner>
        <Menu links={links} />
        <Logo />
        <SearchBar onShowSearchBarClick={onShowSearchBarClick} />
      </Inner>

      <Title />
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
          lg: 'none',
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

const Title = ({}) => {
  return (
    <Text
      text='We find the best products for you'
      sx={{
        color: 'grey.main',
        userSelect: 'none',
        justifySelf: 'center',
        textAlign: 'center',
        fontSize: '13px',
      }}
    />
  )
}
