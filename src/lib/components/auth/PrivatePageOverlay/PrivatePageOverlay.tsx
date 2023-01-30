import React, { useEffect, useState } from 'react'
import Box from '@useweb/ui/Box'
import useAuth from '../../../integrations/Google/Firebase/auth/useAuth/useAuth'

const isProd = process.env.NODE_ENV === 'production'

export default function PrivatePageOverlay({ title = 'Sign in' }) {
  const [show, setShow] = useState(false)

  const auth = useAuth({
    onSignIn() {
      setShow(false)
    },
  })

  const toggleOverlay = () => {
    const showIt = !auth.getIsSignedIn() && isProd
    setShow(showIt)
  }

  useEffect(() => {
    if (auth.isSignOutAfterInitialAuthAttempt) {
      toggleOverlay()
    }
  }, [auth.isSignOutAfterInitialAuthAttempt])

  return show ? (
    <Box
      data-id='PrivatePageOverlay'
      sx={{
        position: 'fixed',
        top: [56, 69],
        right: 0,
        userSelect: 'none',
        bottom: 0,
        left: 0,
        backdropFilter: 'blur(40px) saturate(0.9)',
        // ensure it does not block open drawers
        zIndex: 1111,
        height: '100%',
        width: '100%',
        opacity: 1,
        overflow: 'auto',
        pb: '150px',
      }}
    >
      asdf
    </Box>
  ) : null
}
