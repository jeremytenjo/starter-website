import React, { createContext, useContext } from 'react'

import type { HomePageProps } from '../../../pages'

export const HomePagePropsContext = createContext<HomePageProps>(null as any)

export const HomePagePropsProvider = ({ children, pageProps }) => {
  return (
    <HomePagePropsContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </HomePagePropsContext.Provider>
  )
}

const useHomePageProps = () => useContext(HomePagePropsContext)

export default useHomePageProps
