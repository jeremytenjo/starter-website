import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import useResetPasswordForm from '../useResetPasswordForm/useResetPassword'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import AccountAccessCta from '../../../common/AccountAccessCTA/AccountAccessCta'

export default function ResetPasswordForm() {
  const resetPasswordForm = useResetPasswordForm()

  return (
    <Form<any>
      data-id='ResetPasswordForm'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'row',
        gridGap: '20px',
        justifyItems: 'center',
      }}
      onSubmit={({ formValues }) => {
        resetPasswordForm.exec(formValues)
      }}
    >
      <TextField
        name='email'
        type='email'
        placeholder='Email'
        required='email is required'
        sx={{
          width: '100%',
        }}
      />

      <AccountAccessCta loading={false} text='Send email' />

      {resetPasswordForm.result && !resetPasswordForm.error && (
        <Text text={`Password reset email sent`} sx={{}} />
      )}

      <ErrorMessage
        error={resetPasswordForm.error}
        message={'Error resetting password, please refresh the page and try again.'}
      />
    </Form>
  )
}
