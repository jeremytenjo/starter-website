import React from 'react'

import MenuUi, { type MenuUiProps } from './MenuUi/Menu.ui'

export default function Menu() {
  const links: MenuUiProps['links'] = [{ label: 'Home', url: '/' }]
  const logoSrc = '/images/logo/logo.svg'

  return <MenuUi links={links} logoSrc={logoSrc} />
}
