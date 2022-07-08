import React from 'react'
import Box from '@useweb/ui/Box'

export type RootFooterUiProps = {
  title?: string
}

export default function RootFooterUi(props: RootFooterUiProps) {
  return <Wrapper>Footer</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='RootFooter' component={'footer'} sx={{}}>
      {children}
    </Box>
  )
}
