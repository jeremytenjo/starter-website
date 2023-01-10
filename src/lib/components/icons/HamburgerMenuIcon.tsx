import React from 'react'
import { createSvgIcon } from '@mui/material'
import colors from '../../../theme/tokens/colors'

export default createSvgIcon(
  <svg viewBox='0 0 19 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1 0.861816H17.5M1 6.11182H17.5M1 11.3618H17.5'
      stroke={colors.black.main}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>,
  'HamburgerMenuIcon',
)
