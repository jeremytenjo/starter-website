import React, { createContext, useContext } from 'react'
import Box from '@useweb/ui/Box'

import { type GetRootLayoutDataReturn } from '../../../data/_root/getRootLayoutData/getRootLayoutData'

import RootHeader from './containers/RootHeader/RootHeader'
import RootFooter from './containers/RootFooter/RootFooter'

export type RootLayoutProps = {
  children: any
  rootLayoutData: GetRootLayoutDataReturn
}

export const RootLayoutContext = createContext<GetRootLayoutDataReturn>(null)

export const useRootLayoutData = () => useContext(RootLayoutContext)

export default function RootLayout({ children, rootLayoutData }: RootLayoutProps) {
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
