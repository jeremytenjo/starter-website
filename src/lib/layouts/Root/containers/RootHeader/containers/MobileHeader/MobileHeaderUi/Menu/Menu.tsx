import React from 'react'

import { useRootLayoutData } from '../../../../../../RootLayout'

import MenuUi, { type MenuUiProps } from './MenuUi/Menu.ui'

export default function Menu() {
  const rootLayoutData = useRootLayoutData()

  const links: MenuUiProps['links'] = rootLayoutData.navLinks

  return <MenuUi links={links} />
}
