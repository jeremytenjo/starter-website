import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

import type UserSchema from '../../user.schema'

export type RemoveUsersProps = RemoverProps<UserSchema>

// remover
export const removeUsers = async (props: RemoveUsersProps) => {
  console.log(props)
}

// hook
type useRemoveUsersProps = UseDataProps<UserSchema>['remove']
type useRemoveUsersReturn = UseDataProps<UserSchema>['remove']

export default function useRemoveUsers(props: useRemoveUsersProps): useRemoveUsersReturn {
  const remove: useRemoveUsersReturn = {
    remover: removeUsers,

    onRemove: (result) => {
      props?.onRemove && props.onRemove(result)
    },

    onRemoveError: (error) => {
      props?.onRemoveError && props.onRemoveError(error)
    },
  }

  return remove
}
