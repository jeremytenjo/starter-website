import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export default function HomePageContent() {
  return (
    <Wrapper>
      <Text text={`Home Page`} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='HomePageContent' sx={{}}>
      {children}
    </Box>
  )
}
