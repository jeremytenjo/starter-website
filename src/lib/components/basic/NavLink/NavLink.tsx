import React from 'react'
import { useRouter } from 'next/router'
import UsewebText from '@useweb/ui/Text'
import UsewebLink, { type LinkProps } from '@useweb/ui/Link'

import colors from '../../../../theme/tokens/colors'
import getIsUrlActive from '../../../utils/getIsUrlActive/getIsUrlActive'

export type NavLinkProps = {
  href: string
  label?: string
  icon?: any
  sx?: LinkProps['sx']
  iconColorProp?: 'fill' | 'stroke'
  exact?: boolean
}

export default function NavLink(props: NavLinkProps) {
  const router = useRouter()

  const isActive = getIsUrlActive({
    href: props.href,
    pathname: typeof window !== 'undefined' ? window.location.pathname : router.pathname,
    exact: props.exact,
  })

  return (
    <UsewebLink
      href={props.href}
      sx={{
        '& path': {
          [props.iconColorProp || 'stroke']: isActive
            ? colors.primary.dark
            : colors.grey.dark,
        },
        ...(props.sx || {}),
      }}
    >
      {props.icon || (
        <UsewebText
          text={props.label}
          sx={{
            color: isActive ? 'primary.dark' : 'grey.dark',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '16.94318199157715px',
            textAlign: 'left',
          }}
        />
      )}
    </UsewebLink>
  )
}
