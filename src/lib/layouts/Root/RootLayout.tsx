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

export default function RootLayoutProvider({
  children,
  rootLayoutData,
}: RootLayoutProps) {
  return (
    <RootLayoutContext.Provider value={rootLayoutData}>
      <Wrapper>
        <RootHeader />
        {children}
        <RootFooter />
      </Wrapper>
    </RootLayoutContext.Provider>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='RootLayout'
      sx={{
        p: '20px',
      }}
    >
      {children}
    </Box>
  )
}
