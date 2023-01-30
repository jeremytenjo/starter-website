import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebDivider from '@useweb/ui/Divider'
import UsewebText from '@useweb/ui/Text'

export default function Header({ message }) {
  return (
    <Wrapper>
      <UsewebDivider />
      <UsewebText
        text={message}
        sx={{
          color: 'rgba(94, 109, 85, 1)',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '20px',
          textAlign: 'center',
        }}
      />{' '}
      <UsewebDivider />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Header'
      sx={{
        display: 'grid',
        width: '100%',
        height: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'column',
        gridGap: '10px',
        alignItems: 'center',
        alignContent: 'center',
        paddingTop: '0px',
        paddingBottom: '0px',
      }}
    >
      {children}
    </Box>
  )
}
