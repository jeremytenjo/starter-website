import React from 'react'
import Box from '@useweb/box'
import IconButton from '@mui/material/IconButton'

import IconSearch from '../../../../../../icons/IconSearch'

export type SearchBarUiProps = {
  onShowSearchBarClick: () => any
}

export default function SearchBarUi({ onShowSearchBarClick }: SearchBarUiProps) {
  return (
    <Wrapper>
      <Trigger onClick={onShowSearchBarClick} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return <Box data-id='SearchBar'>{children}</Box>
}

const Trigger = ({ onClick }) => {
  return (
    <Box sx={{}}>
      <IconButton aria-label='Trigger' onClick={onClick}>
        <IconSearch />
      </IconButton>
    </Box>
  )
}
