import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'

export default function Hello() {
  return (
    <Wrapper>
      <HelloFromFigmaText />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Hello'
      sx={{
        display: 'grid',
        width: '431px',
        height: '151px',
        color: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        gridAutoFlow: 'column',
        gridGap: '10px',
        paddingLeft: '73px',
        paddingRight: '73px',
        paddingTop: '56px',
        paddingBottom: '56px',
      }}
    >
      {children}
    </Box>
  )
}

const HelloFromFigmaText = () => {
  return (
    <UsewebText
      text={'Hello from FIGMA!'}
      sx={{
        color: 'rgba(50, 132, 255, 1)',
        fontWeight: 700,
        fontSize: 32,
        fontFamily: 'Inter',
        lineHeight: '38.727272033691406px',
        textAlign: 'left',
      }}
    />
  )
}
