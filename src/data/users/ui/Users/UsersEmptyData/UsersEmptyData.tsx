import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type UserSchema from '../../../user.schema'

export type UsersEmptyDataProps = UseDataUiComponentProps<UserSchema>['emptyData']

export default function UsersEmptyData(props: UsersEmptyDataProps) {
  return <Wrapper>UsersEmptyData</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='UsersEmptyData' sx={{}}>
      {children}
    </Box>
  )
}
