import * as React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import { styled } from '@mui/material/styles'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter'> {
  to: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
}

export const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
})

export type LinkProps = {
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as'] // Useful when the as prop is shallow by styled().
  sx?: MuiLinkProps['sx']
  newTab?: boolean
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    as,
    href,
    linkAs: linkAsProp,
    locale,
    prefetch,
    replace,
    scroll,
    shallow,
    newTab,
    sx = {},
    ...other
  } = props

  const newTabProps = newTab
    ? {
        rel: 'noopener',
        target: '_blank',
      }
    : {}

  const linkAs = linkAsProp || as
  const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale }

  return (
    <MuiLink
      component={NextLinkComposed}
      ref={ref}
      {...nextjsProps}
      sx={{
        textDecoration: 'none',
        color: 'currentColor',
        '&:active': {
          color: 'currentColor',
        },
        ...sx,
      }}
      {...newTabProps}
      {...other}
    />
  )
})

export default Link
