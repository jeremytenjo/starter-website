import React from 'react'
import Box from '@useweb/ui/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type UserSchema from '../../../user.schema'

export type UsersLoadingProps = UseDataUiComponentProps<UserSchema>['loading']

export default function UsersLoading(props: UsersLoadingProps) {
  return (
    <Wrapper>
      <LinearProgress />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='UsersLoading' sx={{}}>
      {children}
    </Box>
  )
}
