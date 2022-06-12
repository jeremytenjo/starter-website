import React from 'react'
import createSvgIcon from '@useweb/create-svg-icon'

export default createSvgIcon(
  <svg viewBox='0 0 512 512' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx={256} cy={256} r={256} fill='url(#paint0_linear_1545_434)' />
    <defs>
      <linearGradient
        id='paint0_linear_1545_434'
        x1={256}
        y1={0}
        x2={256}
        y2={512}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#0085FF' />
        <stop offset={1} stopColor='#E4FFFC' />
      </linearGradient>
    </defs>
  </svg>,
  'IconLogo',
)
