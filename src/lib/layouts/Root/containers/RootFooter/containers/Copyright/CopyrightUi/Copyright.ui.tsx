import React from 'react'
import Box from '@useweb/ui/Box'

export type CopyrightUiProps = {
  title: string,
}

export default function CopyrightUi({ title }: CopyrightUiProps) {
  return <Wrapper>{title}</Wrapper>
}

const Wrapper = ({ children }) => {
  return <Box data-id='Copyright'>{children}</Box>
}
