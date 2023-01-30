import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'

export default function Input() {
  return (
    <Wrapper>
      <HelloGmailComText />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Input'
      sx={{
        display: 'grid',
        width: '100%',
        height: '39px',
        backgroundColor: 'white.main',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(226, 228, 234, 1)',
        borderRadius: '4px',
        gridAutoFlow: 'column',
        gridGap: '10px',
        paddingLeft: '9px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '9px',
      }}
    >
      {children}
    </Box>
  )
}

const HelloGmailComText = () => {
  return (
    <UsewebText
      text={`Email`}
      sx={{
        color: 'black.main',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '16.94318199157715px',
        textAlign: 'left',
      }}
    />
  )
}
