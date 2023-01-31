import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore'
import assert from '@useweb/assert'

export type SignUpWithEmailPasswordProps = {
  email: string
  password: string
}

export default async function signUpWithEmailPassword(
  props: SignUpWithEmailPasswordProps,
) {
  assert({ props })

  // create auth user
  const auth = getAuth()

  const createdAuthUser = await createUserWithEmailAndPassword(
    auth,
    props.email,
    props.password,
  )

  return createdAuthUser
}

export type SignUpWithEmailPasswordReturn = ReturnType<typeof signUpWithEmailPassword>

export const getIsUsernameTaken = async ({ username }) => {
  const db = getFirestore()
  const usersRef = collection(db, 'users')
  const userQuery = query(usersRef, where('displayName', '==', username), limit(1))
  const querySnapshot = await getDocs(userQuery)
  const usernameTaken = !querySnapshot.empty

  if (usernameTaken) {
    throw new Error('Username taken, please try a different one.')
  }

  return usernameTaken
}

export const usernameErrorMessage =
  'Username must 4 to 40 characters long and only use letters, numbers, underscores, and periods.'

export const validateUsername = ({ value, supressError = false }) => {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]{4,40}$/
  const isValid = usernameRegex.test(value)

  if (!isValid && !supressError) {
    throw new Error(usernameErrorMessage)
  }
  return isValid
}

export const validateEmail = ({ value, supressError = false }) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const isValid = emailRegex.test(value)
  if (!isValid && !supressError) {
    throw new Error(emailErrorMessage)
  }
  return isValid
}

export const emailErrorMessage = 'Invalid email address'
