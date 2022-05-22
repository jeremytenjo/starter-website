import React from 'react'

import SearchBarUi from './SearchBarUi/SearchBar.ui'

export default function SearchBar({ onShowSearchBarClick }) {
  return <SearchBarUi onShowSearchBarClick={onShowSearchBarClick} />
}
