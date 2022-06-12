import React from 'react'
import Box from '@useweb/box'
import IconButton from '@useweb/icon-button'

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
      <IconButton name='Trigger' onClick={onClick}>
        <IconSearch />
      </IconButton>
    </Box>
  )
}
