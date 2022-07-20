import React, { createContext, useContext } from 'react'

import type { HomeProps } from '../../../pages/home'

export const HomeContext = createContext<HomeProps>(null as any)

export const HomeProvider = ({ children, pageProps }) => {
  return (
    <HomeContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}

const useHome = () => useContext(HomeContext)

export default useHome
