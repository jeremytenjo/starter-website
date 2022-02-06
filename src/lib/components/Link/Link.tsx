import React from 'react'
import NextLink, { type LinkProps } from 'next/link'
import Box from '@mui/material/Box'

type LinkPropsEdited = Omit<LinkProps, 'href'>

type Props = LinkPropsEdited & {
  href: any
  children: any
  newTab?: boolean
  sx?: any
  onClick?: any
}

/**
 * [Docs](https://nextjs.org/docs/api-reference/next/link)
 * @example
 * <link href='/' />
 */
export default function Link(props: Props) {
  return (
    <NextLink {...props} passHref>
      <LinkContent content={props.children} sx={props.sx} {...props} />
    </NextLink>
  )
}

// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-functional-component
const LinkContent = React.forwardRef(
  ({ onClick, href, content, sx, newTab }: any, ref) => {
    const newTabProps = newTab
      ? {
          rel: 'noopener',
          target: '_blank',
        }
      : {}

    return (
      <Box
        component='a'
        href={href}
        onClick={onClick}
        ref={ref}
        sx={{
          textDecoration: 'none',
          '&:active': {
            color: 'currentColor',
          },
          ...sx,
        }}
        {...newTabProps}
      >
        {content}
      </Box>
    )
  },
)
