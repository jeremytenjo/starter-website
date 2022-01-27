import React from 'react'
import Typography, { type TypographyProps } from '@mui/material/Typography'

type Props = {
  text: string
  tag?: any
} & TypographyProps

/**
 * [Docs](https://material-ui.com/api/typography/)
 */
export default function Text({ text, tag = 'p', variant = 'body1', ...props }: Props) {
  return (
    <Typography component={tag} variant={variant} {...props}>
      {text}
    </Typography>
  )
}
