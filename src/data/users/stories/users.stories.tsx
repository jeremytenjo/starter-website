import React from 'react'
import AsyncTester from '@useweb/async-tester'

// get
import { getUsers, type GetUsersProps } from '../useUsers/useGetUsers/useGetUsers'
// create
import {
  createUsers,
  type CreateUsersProps,
} from '../useUsers/useCreateUsers/useCreateUsers'
// update
import {
  updateUsers,
  type UpdateUsersProps,
} from '../useUsers/useUpdateUsers/useUpdateUsers'
// remove
import {
  removeUsers,
  type RemoveUsersProps,
} from '../useUsers/useRemoveUsers/useRemoveUsers'

export default {
  title: 'data/Users',
}

export const GetUsers = {
  render: () => {
    const payload: GetUsersProps = {}
    const fn = async () => getUsers(payload)
    return <AsyncTester fn={fn} autoExec />
  },
}

// export const CreateUsers = {
//   render: () => {
//     const payload: CreateUsersProps = {}
//     const fn = async () => createUsers(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const UpdateUsers = {
//   render: () => {
//     const payload: UpdateUsersProps = {}
//     const fn = async () => updateUsers(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const RemoveUsers = {
//   render: () => {
//     const payload: RemoveUsersProps = {}
//     const fn = async () => removeUsers(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }
