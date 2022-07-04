import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import { PrismicRichText } from '@prismicio/react'

import linkResolver from '../../utils/linkResolver/linkResolver'

export type RichTextProps = { field: any; sx?: BoxProps['sx'] }

// https://prismic.io/docs/technologies/prismic-react-v2-migration-guide#convert-html-serializer-function-to-an-object
export default function RichText({ field, sx = {} }: RichTextProps) {
  return (
    <Wrapper sx={sx}>
      <PrismicRichText field={field} linkResolver={linkResolver} />
    </Wrapper>
  )
}

const Wrapper = ({ children, sx = {} as any }) => {
  return (
    <Box data-id='RichText' sx={{ ...sx }}>
      {children}
    </Box>
  )
}
