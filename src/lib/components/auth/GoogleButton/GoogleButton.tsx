import React from 'react'
import GoogleIcon from '../../icons/GoogleIcon'
import Button from '@useweb/ui/Button'

export type GoogleButtonProps = {
  onClick?: any
}

export default function GoogleButton(props: GoogleButtonProps) {
  return (
    <Button
      name='continue with google'
      onClick={props.onClick || null}
      sx={{
        backgroundColor: 'white.main',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'gray.med',
        color: 'black.main',
        display: 'flex',
        gap: 2,
        height: '52px',
        fontWeight: 600,
        filter: 'drop-shadow(0px 6px 66px rgba(227, 255, 238, 0.5))',
        '&:hover, &:active, &:focus': {
          boxShadow: 'none',
          backgroundColor: 'primary.light',
          borderColor: 'primary.dark',
        },
      }}
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  )
}
