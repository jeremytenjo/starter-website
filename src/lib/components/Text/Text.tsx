import React from 'react'
import Typography, { type TypographyProps } from '@mui/material/Typography'

type Props = {
  text: string
  as?: any
} & TypographyProps

/**
 * [Docs](https://material-ui.com/api/typography/)
 */
export default function Text({ text, as = 'p', variant = 'body1', ...props }: Props) {
  return (
    <Typography component={as} variant={variant} {...props}>
      {text}
    </Typography>
  )
}
