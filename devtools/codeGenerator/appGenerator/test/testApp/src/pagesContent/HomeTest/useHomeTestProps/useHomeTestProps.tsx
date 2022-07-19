import React, { createContext, useContext } from 'react'

      import type { HomeTestProps } from '../../../pages/home-test'
     
      export const HomeTestContext = createContext<HomeTestProps>(null as any)
      
      export const HomeTestProvider = ({ children, pageProps }) => {
        return (
          <HomeTestContext.Provider
            value={{
              ...pageProps,
            }}
          >
            {children}
          </HomeTestContext.Provider>
        )
      }
      
      const useHomeTest = () => useContext(HomeTestContext)
      
      export default useHomeTest
      
      