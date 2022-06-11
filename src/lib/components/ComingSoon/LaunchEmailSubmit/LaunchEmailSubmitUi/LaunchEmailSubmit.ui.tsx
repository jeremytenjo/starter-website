import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@useweb/button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

type LaunchEmailSubmitUiProps = {
  onSubmit: any
  showSnackbar: boolean
  successMessage: string
  errorMessage: string
  isSuccess: boolean
  onClose: any
}

export default function LaunchEmailSubmitUi({
  onSubmit,
  showSnackbar,
  successMessage,
  errorMessage,
  isSuccess,
  onClose,
}: LaunchEmailSubmitUiProps) {
  const emailRef = useRef(null)

  const onSubmittion = (e) => {
    e.preventDefault()
    const { value: email } = emailRef.current as any
    onSubmit({ email })
  }

  return (
    <>
      <Box
        component='form'
        onSubmit={onSubmittion}
        sx={{
          mb: {
            xs: '21px',
            lg: '37px',
          },
          margin: '0 auto',
          backgroundColor: 'white.main',
          borderRadius: '40px',
          display: 'grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          border: 'solid 1.84px black',
          p: '4px',
          width: {
            xs: '300px',
            lg: '600px',
          },
          justifyContent: 'space-between',
        }}
      >
        <Box
          ref={emailRef}
          component='input'
          required
          type='email'
          placeholder='Enter your email address'
          sx={{
            ml: '10px',
            height: '100%',
            width: '100%',
            fontFamily: 'AlikeRegular',
            fontSize: {
              xs: '14px',
              lg: '21px',
            },
          }}
        />

        <Button
          type='submit'
          sx={{
            backgroundColor: 'black.main',
            color: 'white.main',
            borderRadius: '40px',
            fontFamily: 'AlikeRegular',
            width: 'fit-content',
            fontSize: {
              xs: '12px',
              lg: '20px',
            },
            px: {
              xs: '13px',
              lg: '20px',
            },
            '&:hover': {
              backgroundColor: '#000',
            },
          }}
        >
          Notify Me
        </Button>
      </Box>

      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {isSuccess ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
