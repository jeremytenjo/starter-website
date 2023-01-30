import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from '../useAuth/useAuth'

export type UseRedirectOnAuthProps = { name: string }

export default async function useRedirectOnAuth() {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    if (auth.user.uid) {
      router.push('/jobs')
    }
  }, [auth.user.uid])
}

export type UseRedirectOnAuthReturn = ReturnType<typeof useRedirectOnAuth>
