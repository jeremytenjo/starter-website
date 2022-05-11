import React, { createContext, useContext } from 'react'

export type HomePagePropsTypes = {
  title: string
}

export const HomePagePropsContext = createContext<HomePagePropsTypes>(null as any)

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
