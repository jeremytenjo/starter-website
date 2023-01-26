import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type ErrorMessageProps = { error: any; sx?: BoxProps['sx'] }

export default function ErrorMessage(props: ErrorMessageProps) {
  const error =
    props.error instanceof Error ? String(props.error) : JSON.stringify(props.error)

  return error ? (
    <Box
      data-id='ErrorMessage'
      sx={{
        ...(props.sx || {}),
      }}
    >
      <Text
        text={error.replace(/"/g, '')}
        sx={{
          color: 'error.main',
          textAlign: 'center',
          fontSize: '14px',
        }}
      />
    </Box>
  ) : null
}
