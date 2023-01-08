import React from 'react'
import { useRouter } from 'next/router'
import UsewebText from '@useweb/ui/Text'
import UsewebLink from '@useweb/ui/Link'

import colors from '../../../../theme/tokens/colors'

export type NavLinkProps = { url: string; label?: string; icon?: any }

export default function NavLink(props: NavLinkProps) {
  const router = useRouter()

  return (
    <UsewebLink
      href={props.url}
      sx={{
        '& path': {
          stroke:
            router.pathname === '/messages' ? colors.primary.main : colors.black.main,
        },
      }}
    >
      {props.icon || (
        <UsewebText
          text={props.label}
          sx={{
            color: router.pathname === props.url ? 'primary.main' : 'black.main',
            fontWeight: router.pathname === props.url ? 600 : 400,
            fontSize: 15,
            lineHeight: '16.94318199157715px',
            textAlign: 'left',
          }}
        />
      )}
    </UsewebLink>
  )
}
