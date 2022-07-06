import React from 'react'
import Box from '@useweb/ui/Box'

export type DesktopHeaderUiProps = any

export default function DesktopHeaderUi(props: DesktopHeaderUiProps) {
  return <Wrapper>Header</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='DesktopHeader'
      sx={{
        display: {
          xs: 'none',
          md: 'grid',
        },
      }}
    >
      {children}
    </Box>
  )
}
