import { doc, getDoc, getFirestore } from 'firebase/firestore'

import type UserSchema from '../user.schema'

export type GetSingleUserProps = { uid: UserSchema['uid'] }

export default async function getSingleUser(props: GetSingleUserProps) {
  const db = getFirestore()
  const docRef = doc(db, 'users', props.uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const user: UserSchema = docSnap.data() as UserSchema

    return { user }
  } else {
    throw new Error(`User was not found`)
  }
}

export type GetSingleUserReturn = ReturnType<typeof getSingleUser>
