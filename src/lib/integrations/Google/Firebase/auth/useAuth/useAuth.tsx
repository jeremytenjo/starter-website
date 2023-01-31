import type { UserCredential } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import useFirebaseAuth, {
  addUserToFirestore,
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../../../../data/users/user.schema'
import savePrivateUserData from '../../../../../../data/usersPrivateData/queries/savePrivateUserData/savePrivateUserData'
import signUpWithEmailPassword from '../signUp/signUpWithEmailPassword/signUpWithEmailPassword'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const provider = new GoogleAuthProvider()

// https://developers.google.com/identity/protocols/oauth2/scopes
provider.addScope('https://www.googleapis.com/auth/yt-analytics.readonly')
provider.addScope('https://www.googleapis.com/auth/youtube.readonly')

// Sign in
type SignInFetcherProps = {
  emailSignIn?: {
    email: string
    password: string
  }
  signInWithGoogle?: boolean
}

type UseAuthProps<UserSchema> = {
  onSignOut?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignOut']
  onSignIn?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignIn']
  onSignInError?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignInError']
  onSignUp?: UseFirebaseAuthProps<
    UserSchema,
    SignInFetcherProps,
    SignUpFetcherProps
  >['onSignUp']
}

const signInFetcher = async (props: SignInFetcherProps) => {
  // auth
  const auth = getAuth()
  let firebaseUser: UserCredential | undefined

  if (props.emailSignIn) {
    const email = props.emailSignIn.email

    firebaseUser = await signInWithEmailAndPassword(
      auth,
      email,
      props.emailSignIn.password,
    )
  }

  if (props.signInWithGoogle) {
    // The signed-in user info.
    firebaseUser = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(firebaseUser)
    const googleAccessToken = credential?.accessToken
    if (googleAccessToken) {
      await savePrivateUserData({
        privateUserData: { googleAccessToken },
        uid: firebaseUser.user.uid,
      })
    }
  }

  // @useweb/firebase/useFirebaseAuth handlers return user, it fetrches the usre from firestore
}

// Sign up
type SignUpFetcherProps = {
  emailPasswordData?: {
    email: string
    password: string
  }
  signUpWithGoogle?: boolean
}

const signUpFetcher = async (props: SignUpFetcherProps) => {
  let createdAuthUser: UserCredential | undefined = undefined

  if (props.emailPasswordData) {
    createdAuthUser = await signUpWithEmailPassword({
      email: props.emailPasswordData.email,
      password: props.emailPasswordData.password,
    })
  } else if (props.signUpWithGoogle) {
    // https://firebase.google.com/docs/auth/web/google-signin
    const auth = getAuth()
    createdAuthUser = await signInWithPopup(auth, provider)
  }

  if (createdAuthUser) {
    const credential = GoogleAuthProvider.credentialFromResult(createdAuthUser)
    const googleAccessToken = credential?.accessToken

    if (googleAccessToken) {
      await savePrivateUserData({
        privateUserData: { googleAccessToken },
        uid: createdAuthUser.user.uid,
      })
    }

    const newFirestoreDefaultUserData: UserSchema = {} as any

    const docRef = doc(db, 'users', createdAuthUser.user.uid)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      await addUserToFirestore({
        userData: newFirestoreDefaultUserData,
      })
    }
  } else {
    throw new Error('signUpFetcher createdAuthUser is undefined')
  }
}

export default function useAuth(
  props: UseAuthProps<UserSchema> = {
    onSignIn: undefined,
    onSignInError: undefined,
    onSignOut: undefined,
    onSignUp: undefined,
  },
) {
  const auth = useFirebaseAuth<UserSchema, SignInFetcherProps, SignUpFetcherProps>({
    auth: getAuth(),
    defaultUserCreator: async ({ authUser }) => {
      const email: string = authUser.email as any
      const username = email.split('@')[0]
      const newFirestoreDefaultUserData: UserSchema = {
        uid: authUser.uid,
        displayName: username,
        email,
        photoURL: authUser.photoURL || '',
        emailVerified: false,
      }

      return newFirestoreDefaultUserData
    },
    // sign in
    signInFetcher,
    onSignIn: ({ result }) => {
      if (result) {
        props.onSignIn && props.onSignIn({ result })
      }
    },
    onSignInError: ({ error }) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        props.onSignInError && props.onSignInError(error)
      }
    },
    // sign up
    signUpFetcher,
    onSignUp() {
      props.onSignUp && props.onSignUp()
    },
    onSignOut: () => {
      props.onSignOut && props.onSignOut()
    },
  })

  return auth
}
