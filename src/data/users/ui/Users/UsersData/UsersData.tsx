import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type UserSchema from '../../../user.schema'

export type UsersDataProps = UseDataUiComponentProps<UserSchema>['data']

export default function UsersData(props: UsersDataProps) {
  return <Wrapper>UsersData</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='UsersData' sx={{}}>
      {children}
    </Box>
  )
}
