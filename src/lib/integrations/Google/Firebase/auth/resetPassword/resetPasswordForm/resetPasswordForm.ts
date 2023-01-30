import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import assert from '../../../../../../utils/misc/assert/assert'

export type ResetPasswordFormProps = { email: string }

export default async function resetPasswordForm(props: ResetPasswordFormProps) {
  assert({
    condition: !!props.email,
    name: 'email',
  })

  const auth = getAuth()
  await sendPasswordResetEmail(auth, props.email)

  return true
}

export type ResetPasswordFormReturn = ReturnType<typeof resetPasswordForm>
