import React, { createContext, useContext } from 'react'

import type { HomeProps } from '../../../pages'

export const HomePropsContext = createContext<HomeProps>(null as any)

export const HomePropsProvider = ({ children, pageProps }) => {
  return (
    <HomePropsContext.Provider
      value={{
        ...pageProps,
      }}
    >
      {children}
    </HomePropsContext.Provider>
  )
}

const useHomeProps = () => useContext(HomePropsContext)

export default useHomeProps
