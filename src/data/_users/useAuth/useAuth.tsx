import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import useFirebaseAuth, {
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'
import useSnackbar from '@useweb/ui/Snackbar'

const provider = new GoogleAuthProvider()

type UseAuthProps<SignInFetcherReturn> = {
  onSignOut?: UseFirebaseAuthProps<SignInFetcherReturn>['onSignOut']
  onSignIn?: UseFirebaseAuthProps<SignInFetcherReturn>['onSignIn']
  onSignInError?: UseFirebaseAuthProps<SignInFetcherReturn>['onSignInError']
}

const signInFetcher = async () => {
  const auth = getAuth()
  const result = await signInWithPopup(auth, provider)
  const credential = GoogleAuthProvider.credentialFromResult(result)
  const accessToken = credential?.accessToken
  const user = result.user

  return { ...user, accessToken }
}

type SignInFetcherReturn = Awaited<ReturnType<typeof signInFetcher>>

export default function useAuth(
  props: UseAuthProps<SignInFetcherReturn> = {
    onSignOut: undefined,
    onSignIn: undefined,
    onSignInError: undefined,
  },
) {
  const snackbar = useSnackbar()

  const signInWithGoogle = useFirebaseAuth<SignInFetcherReturn>({
    auth: getAuth(),
    signInFetcher,
    onSignIn: () => {
      snackbar.show({ severity: 'success', message: 'Welcome' })
    },
    onSignInError: ({ error }) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        snackbar.show({
          severity: 'error',
          message: 'Error signing in, please try again.',
        })
      }
    },
    onSignOut: () => {
      props.onSignOut && props.onSignOut()
    },
  })

  return {
    user: signInWithGoogle.user,
    signInWithGoogle: signInWithGoogle.signIn.exec,
    signingIn: signInWithGoogle.signIn.loading,
    error: signInWithGoogle.signIn.error,
    signOutFromGoogle: signInWithGoogle.signOut,
  }
}
