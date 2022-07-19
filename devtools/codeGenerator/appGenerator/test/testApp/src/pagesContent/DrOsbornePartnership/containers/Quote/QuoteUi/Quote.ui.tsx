import React from 'react'
import Box from '@useweb/ui/Box'

export type QuoteUiProps = {
  title: string,
}

export default function QuoteUi(props: QuoteUiProps) {
  return (
    <Wrapper>
      <Title {...props} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='Quote' sx={{}}>
      {children}
    </Box>
  )
}

const Title = (props: QuoteUiProps) => {
  return (
    <Box data-id='Title' sx={{}}>
      {props.title}
    </Box>
  )
}
