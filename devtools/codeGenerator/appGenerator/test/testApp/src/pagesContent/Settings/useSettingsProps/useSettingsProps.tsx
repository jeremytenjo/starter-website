import React, { createContext, useContext } from 'react'

      import type { SettingsProps } from '../../../pages/settings'
     
      export const SettingsContext = createContext<SettingsProps>(null as any)
      
      export const SettingsProvider = ({ children, pageProps }) => {
        return (
          <SettingsContext.Provider
            value={{
              ...pageProps,
            }}
          >
            {children}
          </SettingsContext.Provider>
        )
      }
      
      const usesettings = () => useContext(SettingsContext)
      
      export default usesettings
      
      