import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import Text from '@useweb/ui/Text'
import { useRouter } from 'next/router'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import logError from '@/src/lib/utils/loggers/logError/logError'

import GoogleButton from '../../../../../../../../components/auth/GoogleButton/GoogleButton'
import AccountAccessCta from '../../../../common/AccountAccessCTA/AccountAccessCta'
import useAuth from '../../../../useAuth/useAuth'

export type SignUpUserFormProps = any

export default function SignUpUserForm() {
  const router = useRouter()
  const auth = useAuth({
    onSignUp() {
      router.push('/jobs')
    },
  })

  return (
    <>
      <GoogleButton onClick={() => auth.signUp.exec({ signUpWithGoogle: true })} />

      <Text
        text={`or`}
        sx={{
          my: '15px',
        }}
      />

      <Form
        data-id='SignUpUserForm'
        sx={{
          display: 'grid',
          alignContent: 'start',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          gridAutoFlow: 'row',
          gridGap: '20px',
          justifyItems: 'center',
        }}
        onSubmit={(formProps) => {
          auth.signUp.exec({ emailPasswordData: formProps })
        }}
      >
        <TextField
          name='email'
          type='email'
          placeholder='Email'
          required='missing email'
          inputProps={{
            autoCapitalize: 'off',
            autoCorrect: 'off',
          }}
          sx={{
            width: '100%',
          }}
        />

        <TextField
          id='new-password'
          type='password'
          name='password'
          placeholder='Password'
          required='missing password'
          inputProps={{
            autoComplete: 'new-password',
            autoCapitalize: 'off',
          }}
          registerProps={{
            validate: (value) => {
              const isLongerThanSixChars = value.length > 6
              const isValid = isLongerThanSixChars
              return isValid ? true : 'Password should be at least 6 characters.'
            },
          }}
          sx={{
            width: '100%',
          }}
        />

        <AccountAccessCta loading={auth.signUp.loading} text='Continue with Email' />

        {auth.signUp.error && (
          <ErrorMessage
            error={getFirebaseErrorMessage({ error: auth.signUp.error })}
            message={getFirebaseErrorMessage({ error: auth.signUp.error })}
          />
        )}
      </Form>
    </>
  )
}

const getFirebaseErrorMessage = ({ error }) => {
  const stringError = String(error)
  logError({
    error: stringError,
    fnName: 'SignUpUserForm',
  })

  switch (stringError) {
    case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
      return 'Email taken, please try a new email.'
    case 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).':
      return 'Password should be at least 6 characters.'
    case 'Error: username taken, please try a different one':
      return 'Username taken, please try a different one.'

    default:
      return 'Error creating account, please refresh the page and try again.'
  }
}
