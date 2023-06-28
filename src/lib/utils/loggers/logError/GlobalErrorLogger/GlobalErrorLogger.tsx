import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@useweb/ui/Button'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Box from '@useweb/ui/Box'
import logError from '../logError'

export type GlobalErrorLoggerProps = { children: any }

function Fallback({ error, resetErrorBoundary }) {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      {/* <FullLogoLink
        sx={{
          mb: 2,
        }}
      /> */}

      <ErrorMessage
        error={error}
        message='Oops, something went wrong. We&rsquo;re sorry for the inconvenience. Please
        try again later or contact support if the problem persists.'
      />

      <Button
        name='Go back home'
        onClick={() => resetErrorBoundary()}
        sx={{ mt: 2, width: 'fit-content' }}
      >
        Go back Home
      </Button>
    </Box>
  )
}

const onError = (error: Error) => {
  logError({
    error: error.message,
    fnName: 'GlobalErrorLogger',
    fatal: true,
  })
}

export default function GlobalErrorLogger(props: GlobalErrorLoggerProps) {
  const onReset = () => {
    window.location.href = '/'
  }

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={onError} onReset={onReset}>
      {props.children}
    </ErrorBoundary>
  )
}
