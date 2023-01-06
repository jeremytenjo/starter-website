import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type UserSchema from '../../../user.schema'

export type UsersErrorProps = UseDataUiComponentProps<UserSchema>['error']

export default function UsersError(props: UsersErrorProps) {
  const error =
    props.error instanceof Error ? String(props.error) : JSON.stringify(props.error)

  return (
    <Wrapper>
      <Text
        text={error}
        sx={{
          color: 'red',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='UsersError' sx={{}}>
      {children}
    </Box>
  )
}
