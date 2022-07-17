import React, { createContext, useContext } from 'react'
import Box from '@useweb/ui/Box'

import { type GetRootDataReturn } from '../../../data/_root/getRootData/getRootData'

import RootHeader from './containers/RootHeader/RootHeader'
import RootFooter from './containers/RootFooter/RootFooter'

export type RootLayoutProps = GetRootDataReturn

export const RootLayoutContext = createContext<GetRootDataReturn>(null as any)

export const useRootLayoutData = () => useContext(RootLayoutContext)

export default function RootLayout({ children, rootLayoutData }) {
  return (
    <RootLayoutContext.Provider value={{ ...rootLayoutData }}>
      <RootHeader />
      <Wrapper>{children}</Wrapper>
      <RootFooter />
    </RootLayoutContext.Provider>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='RootLayout'
      component={'main'}
      sx={{
        px: '20px',
      }}
    >
      {children}
    </Box>
  )
}
