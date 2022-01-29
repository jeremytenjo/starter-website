import React from 'react'

import AppBar from './containers/RootAppBar/RootAppBar'
import Footer from './containers/RootFooter/RootFooter'

export default function RootLayout({ children }) {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  )
}
