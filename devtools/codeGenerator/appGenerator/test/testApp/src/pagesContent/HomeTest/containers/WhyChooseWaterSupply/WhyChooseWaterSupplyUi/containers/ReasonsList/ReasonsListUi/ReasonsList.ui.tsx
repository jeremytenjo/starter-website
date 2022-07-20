import React from 'react'
import Box from '@useweb/ui/Box'

import ChildOfReasonsList from './containers/ChildOfReasonsList/ChildOfReasonsList'

export default function ReasonsListUi() {
  return (
    <Wrapper>
      <ChildOfReasonsList />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ReasonsList' sx={{}}>
      {children}
    </Box>
  )
}
