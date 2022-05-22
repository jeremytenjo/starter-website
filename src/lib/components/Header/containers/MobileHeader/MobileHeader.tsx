import React from 'react'

import MobileHeaderUi from './MobileHeaderUi/MobileHeader.ui'

export default function MobileHeader({ links, onShowSearchBarClick }) {
  return <MobileHeaderUi links={links} onShowSearchBarClick={onShowSearchBarClick} />
}
