import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Box from '@useweb/ui/Box'
import logError from '../logError'

export type GlobalErrorLoggerProps = { children: any }

function Fallback({ error }) {
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

      <Button name='Go back home' sx={{ mt: 2, width: 'fit-content' }}>
        <Link href={`/`}>Go back Home</Link>
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
  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={onError}>
      {props.children}
    </ErrorBoundary>
  )
}
