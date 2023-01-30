import useAsync from '@useweb/use-async'
import { useRouter } from 'next/router'
import resetPasswordFormFn, { type ResetPasswordFormProps } from '../resetPasswordForm'

export default function useResetPasswordForm() {
  const router = useRouter()

  const resetPasswordForm = useAsync<ResetPasswordFormProps, any>({
    fn: resetPasswordFormFn,
    onResult: () => {
      router.push('/jobs')
    },
  })

  return resetPasswordForm
}
