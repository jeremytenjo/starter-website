import useData, { type UseDataProps } from '@useweb/use-data'

import type UserSchema from '../user.schema'

import useGetUsers, { type GetUsersProps } from './useGetUsers/useGetUsers'
import useCreateUsers from './useCreateUsers/useCreateUsers'
import useUpdateUsers from './useUpdateUsers/useUpdateUsers'
import useRemoveUsers from './useRemoveUsers/useRemoveUsers'

export type UseUsersProps = {
  getOptions?: UseDataProps<UserSchema, GetUsersProps>['get']
  createOptions?: UseDataProps<UserSchema>['create']
  updateOptions?: UseDataProps<UserSchema>['update']
  removeOptions?: UseDataProps<UserSchema>['remove']
}

export default function useUsers(props: UseUsersProps = {}) {
  const get = useGetUsers(props?.getOptions)
  const create = useCreateUsers(props?.createOptions)
  const update = useUpdateUsers(props?.updateOptions)
  const remove = useRemoveUsers(props?.removeOptions)

  const users = useData<UserSchema>({
    id: 'users',
    get,
    create,
    update,
    remove,
  })

  return users
}
