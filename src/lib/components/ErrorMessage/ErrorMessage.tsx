import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Alert from '@useweb/ui/Alert'

export type ErrorMessageProps = { error: any; sx?: BoxProps['sx'] }

export default function ErrorMessage(props: ErrorMessageProps) {
  const error =
    props.error instanceof Error ? String(props.error) : JSON.stringify(props.error)

  return error && error !== 'null' ? (
    <Alert
      data-id='ErrorMessage'
      severity='error'
      sx={{
        ...(props.sx || {}),
      }}
    >
      <Text
        text={error.replace(/"/g, '').replace('Error:', '')}
        sx={{
          color: 'error.main',
          textAlign: ['center', , 'left'],
          fontSize: '14px',
          maxWidth: '400px',
        }}
      />
    </Alert>
  ) : null
}
