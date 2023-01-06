import React from 'react'
import Box from '@useweb/ui/Box'
import UseDataUi from '@useweb/use-data-ui'

import useUsers, { type UseUsersProps } from '../../useUsers/useUsers'
import type UserSchema from '../../user.schema'

import UsersData from './UsersData/UsersData'
import UsersEmptyData from './UsersEmptyData/UsersEmptyData'
import UsersLoading from './UsersLoading/UsersLoading'
import UsersError from './UsersError/UsersError'

export type UsersProps = {
  UseProps?: UseUsersProps
}

export default function Users(props: UsersProps) {
  const users = useUsers(props.UseProps)

  return (
    <Wrapper>
      <UseDataUi<UserSchema>
        asyncFunctionVariable={users}
        data={UsersData}
        emptyData={UsersEmptyData}
        loading={UsersLoading}
        error={UsersError}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Users' sx={{}}>
      {children}
    </Box>
  )
}
