import { type UseDataProps } from '@useweb/use-data'

import type UserSchema from '../../user.schema'

// fetcher
export type GetUsersProps = any

export const getUsers = async (props: GetUsersProps) => {
  const users: UserSchema[] = []

  return users
}

// hook
type useGetUsersProps = UseDataProps<UserSchema>['get']
type useGetUsersReturn = UseDataProps<UserSchema>['get']

export default function useGetUsers(props: useGetUsersProps): useGetUsersReturn {
  const get: useGetUsersReturn = {
    fetcher: getUsers,

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
