import React from 'react'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

import Header from './containers/Header/Header'

export type AccountAccessLinkProps = {
  message: string
  link: {
    label: string
    href: string
  }
}

export default function AccountAccessLink(props: AccountAccessLinkProps) {
  return (
    <Link
      data-id='AccountAccessLink'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: '100%',
        backgroundColor: 'white.main',
        gridAutoFlow: 'row',
        justifyItems: 'center',
        paddingTop: '1px',
        mt: '90px',
      }}
      href={props.link.href}
    >
      <Header message={props.message} />
      <Button
        name='Button'
        variant='text'
        sx={{
          color: 'primary.dark',
        }}
      >
        {props.link.label}
      </Button>
    </Link>
  )
}
