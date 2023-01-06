import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'

import type UserSchema from '../../user.schema'

export type UpdateUsersProps = UpdaterProps<UserSchema>

// updater
export const updateUsers = async (props: UpdateUsersProps) => {
  console.log(props)
}

// hook
type useUpdateUsersProps = UseDataProps<UserSchema>['update']
type useUpdateUsersReturn = UseDataProps<UserSchema>['update']

export default function useUpdateUsers(props: useUpdateUsersProps): useUpdateUsersReturn {
  const update: useUpdateUsersReturn = {
    updater: updateUsers,

    onUpdate: (result) => {
      props?.onUpdate && props.onUpdate(result)
    },

    onUpdateError: (error) => {
      props?.onUpdateError && props.onUpdateError(error)
    },
  }

  return update
}
