import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

import type UserSchema from '../../user.schema'

export type CreateUsersProps = CreatorProps<UserSchema>

// creator
export const createUsers = async (props: CreateUsersProps) => {
  const newItem: UserSchema | undefined = undefined

  return { newItem }
}

// hook
type useCreateUsersProps = UseDataProps<UserSchema>['create']
type useCreateUsersReturn = UseDataProps<UserSchema>['create']

export default function useCreateUsers(props: useCreateUsersProps): useCreateUsersReturn {
  const create: useCreateUsersReturn = {
    creator: createUsers,

    onCreate: (result) => {
      props?.onCreate && props?.onCreate(result)
    },

    onCreateError: (error) => {
      console.error('useCreateUsers error')
      console.error(error)
      props?.onCreateError && props?.onCreateError(error)
    },
  }

  return create
}
