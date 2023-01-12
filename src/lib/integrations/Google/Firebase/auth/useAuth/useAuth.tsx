import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import useFirebaseAuth, {
  type UseFirebaseAuthProps,
} from '@useweb/firebase/useFirebaseAuth'
import useSnackbar from '@useweb/ui/Snackbar'

import getSingleUser from '../../../../../../data/users/queries/getSingleUser/getSingleUser'

type SignInFetcherProps = {
  email: string
  password: string
}

type UseAuthProps<SignInFetcherReturn> = {
  onSignOut?: UseFirebaseAuthProps<SignInFetcherReturn, SignInFetcherProps>['onSignOut']
  onSignIn?: UseFirebaseAuthProps<SignInFetcherReturn, SignInFetcherProps>['onSignIn']
  onSignInError?: UseFirebaseAuthProps<
    SignInFetcherReturn,
    SignInFetcherProps
  >['onSignInError']
}

const signInFetcher = async (props: SignInFetcherProps) => {
  // auth
  const auth = getAuth()
  const firebaseUser = await signInWithEmailAndPassword(auth, props.email, props.password)
  // get user data from firestore
  const { user } = await getSingleUser({ uid: firebaseUser.user.uid })

  return user
}

type SignInFetcherReturn = Awaited<ReturnType<typeof signInFetcher>>

export default function useAuth(
  props: UseAuthProps<SignInFetcherReturn> = {
    onSignIn: undefined,
    onSignInError: undefined,
    onSignOut: undefined,
  },
) {
  const snackbar = useSnackbar()

  const auth = useFirebaseAuth<SignInFetcherReturn, SignInFetcherProps>({
    auth: getAuth(),
    signInFetcher,
    onSignIn: ({ result }) => {
      props.onSignIn && props.onSignIn({ result })
      snackbar.show({ severity: 'success', message: `Welcome ${result.displayName}` })
    },
    onSignInError: ({ error }) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        props.onSignInError && props.onSignInError(error)
        snackbar.show({
          severity: 'error',
          message: 'Error signing in, please try again.',
        })
      }
    },
    onSignOut: () => {
      props.onSignOut && props.onSignOut()
      props.onSignOut && props.onSignOut()
    },
  })

  return auth
}
