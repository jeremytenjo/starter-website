import React from 'react'
import Box from '@useweb/ui/Box'

export type MobileHeaderUi = any

export default function MobileHeaderUi(props: MobileHeaderUi) {
  return <Wrapper>Header</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='MobileHeader'
      sx={{
        display: {
          xs: 'grid',
          lg: 'none',
        },
        pb: '20px',
        gap: '12px',
      }}
    >
      {children}
    </Box>
  )
}
