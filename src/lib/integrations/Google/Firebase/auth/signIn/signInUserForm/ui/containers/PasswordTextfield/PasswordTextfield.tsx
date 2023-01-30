import React from 'react'
import Box from '@useweb/ui/Box'

import Input from './containers/Input/Input'

export default function PasswordTextfield() {
  return (
    <Wrapper>
      <Input />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='PasswordTextfield'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: '100%',
        height: '39px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'row',
        gridGap: '10px',
      }}
    >
      {children}
    </Box>
  )
}
