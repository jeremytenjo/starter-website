import React from 'react'
import Box from '@useweb/ui/Box'

import Copyright from './containers/Copyright/Copyright'

export default function RootFooter() {
  return (
    <Wrapper>
      <Copyright />
    </Wrapper>
  )
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
