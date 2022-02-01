import React from 'react'
import NextLink, { type LinkProps } from 'next/link'
import Box from '@mui/material/Box'

type Props = LinkProps & {
  sx?: any
  children: any
}

/**
 * [Docs](https://nextjs.org/docs/api-reference/next/link)
 * @example
 * <link href='/' />
 */
export default function Link(props: Props) {
  return (
    <NextLink {...props}>
      <LinkContent content={props.children} sx={props.sx} />
    </NextLink>
  )
}

// https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-functional-component
const LinkContent = React.forwardRef(({ onClick, href, content, sx }: any, ref) => {
  return (
    <Box component='a' href={href} onClick={onClick} ref={ref} sx={sx}>
      {content}
    </Box>
  )
})
