import React from 'react'
import Box from '@useweb/ui/Box'
import GoogleButton from '../../../../../../../components/auth/GoogleButton/GoogleButton'
import useAuth from '../../../useAuth/useAuth'

export default function SignUpWithGoogle() {
  const auth = useAuth()

  return (
    <Wrapper>
      <GoogleButton onClick={() => auth.signUp.exec({ signUpWithGoogle: true })} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='SignUpWithGoogle'
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
