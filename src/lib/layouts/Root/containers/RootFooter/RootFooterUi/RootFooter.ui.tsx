import React from 'react'
import Box from '@useweb/ui/Box'

export type RootFooterUiProps = {
  title?: string
}

export default function RootFooterUi(props: RootFooterUiProps) {
  return <Wrapper>Footer</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Footer'
      component={'footer'}
      sx={{
        px: '20px',
      }}
    >
      {children}
    </Box>
  )
}
