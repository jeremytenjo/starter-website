type UserSchema = {
  uid: string
  displayName: string
  email: string
  photoURL: string
  emailVerified: boolean
  phoneNumber?: string
}

export default UserSchema
