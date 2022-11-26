import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'

import Star2Icon from '../../lib/components/icons/Star2/Star2'
import Star1Icon from '../../lib/components/icons/Star1/Star1'

export default function HelloFromFigma() {
  return (
    <Wrapper>
      <Star2Icon
        sx={{ width: '24.73px', height: '23.52px', color: 'rgba(0, 61, 24, 1)' }}
        viewBox='0 0 24.72747039794922 23.5172119140625'
      />
      <HelloFromFigma1Text />
      <Star1Icon
        sx={{ width: '24.73px', height: '23.52px', color: 'rgba(0, 61, 24, 1)' }}
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
        width: '500.45px',
        height: '151px',
        color: 'rgba(169, 255, 203, 1)',
        backgroundColor: 'rgba(169, 255, 203, 1)',
        borderRadius: '140px',
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
        color: 'rgba(0, 61, 24, 1)',
        fontWeight: 700,
        fontSize: 32,
        fontFamily: 'Inter',
        lineHeight: '38.727272033691406px',
        textAlign: 'left',
      }}
    />
  )
}
