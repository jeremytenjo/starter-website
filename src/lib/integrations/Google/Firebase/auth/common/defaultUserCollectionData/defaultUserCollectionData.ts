import type UserSchema from '../../../../../../../data/users/user.schema'

const getDefaultUserCollectionData = (userProps: Partial<UserSchema>) => {
  const defaultUser: UserSchema = {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    ...(userProps || {}),
  }

  return defaultUser
}

export default getDefaultUserCollectionData
