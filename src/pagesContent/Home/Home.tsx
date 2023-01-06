import React from 'react'
import Box from '@useweb/ui/Box'

export default function HomePageContent() {
  return <Wrapper>HomePage</Wrapper>
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='HomePageContent' sx={{}}>
      {children}
    </Box>
  )
}
