import React from 'react'
import Link from '@useweb/link-next'

import IconLogo from '../../../../../../icons/IconLogo'

export type LogoUiProps = {
  title: string
}

export default function LogoUi() {
  return (
    <Wrapper>
      <span style={{ opacity: '0', position: 'absolute', pointerEvents: 'none' }}>
        Go home
      </span>
      <IconLogo
        sx={{
          width: '77px',
          height: '49px',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Link
      href='/'
      data-id='Logo'
      sx={{
        display: 'grid',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      {children}
    </Link>
  )
}
