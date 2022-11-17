import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'

import Ellipse1Icon from '../../lib/components/icons/Ellipse1/Ellipse1'
import Star1Icon from '../../lib/components/icons/Star1/Star1'

export default function HelloFromFigma() {
  return (
    <Wrapper>
      <Ellipse1Icon
        sx={{ width: '18px', height: '18px', color: 'rgba(255, 87, 50, 1)' }}
        viewBox='0 0 18 18'
      />
      <HelloFromFigma1Text />
      <Star1Icon
        sx={{ width: '24.73px', height: '23.52px', color: 'rgba(103, 50, 255, 1)' }}
        viewBox='0 0 24.72747802734375 23.5172119140625'
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='HelloFromFigma'
      sx={{
        display: 'grid',
        width: '493.73px',
        height: '151px',
        color: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        gridAutoFlow: 'column',
        gridGap: '10px',
        alignItems: 'center',
        alignContent: 'center',
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

const HelloFromFigma1Text = () => {
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
