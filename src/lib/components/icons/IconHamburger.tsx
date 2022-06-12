import React from 'react'
import { createSvgIcon } from '@mui/material'

export default createSvgIcon(
  <svg viewBox='0 0 22 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width={22} height={1.5} rx={0.75} fill='black' />
    <rect y={6.5} width={22} height={1.5} rx={0.75} fill='black' />
    <rect y={13} width={22} height={1.5} rx={0.75} fill='black' />
  </svg>,
  'IconHamburger',
)
