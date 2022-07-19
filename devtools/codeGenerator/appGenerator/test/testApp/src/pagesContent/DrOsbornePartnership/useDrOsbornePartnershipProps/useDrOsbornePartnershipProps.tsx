import React, { createContext, useContext } from 'react'

      import type { DrOsbornePartnershipProps } from '../../../pages/dr-osborne-partnership'
     
      export const DrOsbornePartnershipContext = createContext<DrOsbornePartnershipProps>(null as any)
      
      export const DrOsbornePartnershipProvider = ({ children, pageProps }) => {
        return (
          <DrOsbornePartnershipContext.Provider
            value={{
              ...pageProps,
            }}
          >
            {children}
          </DrOsbornePartnershipContext.Provider>
        )
      }
      
      const useDrOsbornePartnership = () => useContext(DrOsbornePartnershipContext)
      
      export default useDrOsbornePartnership
      
      