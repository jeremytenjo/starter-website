'use client'
import React, { createContext, useContext } from 'react'

// import type { HomeProps } from '../../../app/page'

export const HomePropsContext = createContext<any>(null as any)

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
