import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useAuth from '../../../useAuth/useAuth'
import { useRouter } from 'next/router'
import useSnackbar from '@useweb/ui/Snackbar'
import GoogleButton from '../../../../../../../components/auth/GoogleButton/GoogleButton'
import AccountAccessCta from '../../../common/AccountAccessCTA/AccountAccessCta'

type SignInUserFormProps = {
  redirectOnSignIn?: boolean
}

export default function SignInUserForm(props: SignInUserFormProps) {
  const { redirectOnSignIn = true } = props

  const snackbar = useSnackbar()

  const router = useRouter()

  const auth = useAuth({
    onSignIn({ result }) {
      if (redirectOnSignIn) {
        router.push('/jobs')
        snackbar.show({
          severity: 'success',
          message: `Welcome ${result.displayName}`,
        })
      }
    },
  })

  return (
    <>
      <GoogleButton onClick={() => auth.signIn({ signInWithGoogle: true })} />

      <Text
        text={`or`}
        sx={{
          my: '15px',
        }}
      />

      <Form
        data-id='SignInUserForm'
        sx={{
          display: 'grid',
          alignContent: 'start',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          gridAutoFlow: 'row',
          gridGap: '20px',
          justifyItems: 'center',
        }}
        onSubmit={(formValues) => {
          auth.signIn({ emailSignIn: formValues })
        }}
      >
        <TextField
          name='email'
          type='email'
          placeholder='Email'
          required='email or username is required'
          inputProps={{
            autoCapitalize: 'off',
            autoCorrect: 'off',
          }}
          sx={{
            width: '100%',
          }}
        />
        <TextField
          id='current-password'
          type='password'
          name='password'
          placeholder='Password'
          required='password is required'
          inputProps={{
            autoComplete: 'current-password',
            autoCapitalize: 'off',
          }}
          sx={{
            width: '100%',
          }}
        />

        <AccountAccessCta loading={auth.isSigningIn} text='Continue with Email' />

        {auth.signingInError && (
          <ErrorMessage
            error={auth.signingInError}
            message={'You have entered an invalid username/email or password'}
          />
        )}
        <Link href={'/reset-password'}>
          <Text
            text={`Forgot password?`}
            sx={{
              color: 'rgba(94, 109, 85, 1)',
              fontWeight: 400,
              fontSize: 13,
              lineHeight: '20px',
              textAlign: 'center',
            }}
          />
        </Link>
      </Form>
    </>
  )
}
