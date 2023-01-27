import type { User } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth'
import useFirebaseAuth, {
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'

import type UserSchema from '../../../../../../data/users/user.schema'

const provider = new GoogleAuthProvider()

// https://developers.google.com/identity/protocols/oauth2/scopes
// provider.addScope('https://www.googleapis.com/auth/yt-analytics.readonly')

type SignInFetcherProps = {
  emailSignIn?: {
    email: string
    password: string
  }
  signInWithGoogle?: boolean
}

type UseAuthProps<UserSchema> = {
  onSignOut?: UseFirebaseAuthProps<UserSchema, SignInFetcherProps>['onSignOut']
  onSignIn?: UseFirebaseAuthProps<UserSchema, SignInFetcherProps>['onSignIn']
  onSignInError?: UseFirebaseAuthProps<UserSchema, SignInFetcherProps>['onSignInError']
}

const signInFetcher = async (props: SignInFetcherProps) => {
  // auth
  const auth = getAuth()
  let firebaseUser: User | undefined | any = undefined

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
    const token = credential?.accessToken
    // console.log({ token })
  }
  // @useweb/firebase/useFirebaseAuth handlers return user, it fetrches the usre from firestore
}

export default function useAuth(
  props: UseAuthProps<UserSchema> = {
    onSignIn: undefined,
    onSignInError: undefined,
    onSignOut: undefined,
  },
) {
  const auth = useFirebaseAuth<UserSchema, SignInFetcherProps>({
    auth: getAuth(),
    signInFetcher,
    onSignIn: ({ result }) => {
      if (result) {
        props.onSignIn && props.onSignIn({ result })
      }
    },
    onSignInError: ({ error }) => {
      console.log({ error })
      if (error.code !== 'auth/popup-closed-by-user') {
        props.onSignInError && props.onSignInError(error)
      }
    },
    onSignOut: () => {
      props.onSignOut && props.onSignOut()
    },
  })

  return auth
}
