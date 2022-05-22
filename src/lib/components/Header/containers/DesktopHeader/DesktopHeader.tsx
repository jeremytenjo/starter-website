import React from 'react'

import DesktopHeaderUi from './DesktopHeaderUi/DesktopHeader.ui'

export default function DesktopHeader({ links, onShowSearchBarClick, data }) {
  return (
    <DesktopHeaderUi
      links={links}
      onShowSearchBarClick={onShowSearchBarClick}
      data={data}
    />
  )
}
