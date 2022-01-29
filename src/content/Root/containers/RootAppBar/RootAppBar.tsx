import React from 'react'

import AppBarUi from './RootAppBarUi/RootAppBar.ui'

export default function RootAppBar() {
  const navLinks = [
    { label: 'Apps', selector: '#apps' },
    { label: 'OSS', selector: '#oss' },
    { label: 'Plugins', selector: '#plugins' },
    { label: 'Blog', url: '/blog' },
  ]

  return <AppBarUi navLinks={navLinks} />
}
