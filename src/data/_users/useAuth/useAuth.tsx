import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import useFirebaseAuth, {
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'
import useSnackbar from '@useweb/ui/Snackbar'

const provider = new GoogleAuthProvider()

type UseAuthProps = {
  onSignOut?: UseFirebaseAuthProps['onSignOut']
  onSignIn?: UseFirebaseAuthProps['onSignIn']
  onSignInError?: UseFirebaseAuthProps['onSignInError']
}

export default function useAuth(
  props: UseAuthProps = {
    onSignOut: undefined,
    onSignIn: undefined,
    onSignInError: undefined,
  },
) {
  const snackbar = useSnackbar()

  const signInWithGoogle = useFirebaseAuth({
    auth: getAuth(),
    signInFetcher: async () => {
      const auth = getAuth()
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken
      const user = result.user

      return { ...user, accessToken }
    },

    onSignIn: () => {
      snackbar.show({ severity: 'success', message: 'Welcome' })
    },
    onSignInError: (error) => {
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
