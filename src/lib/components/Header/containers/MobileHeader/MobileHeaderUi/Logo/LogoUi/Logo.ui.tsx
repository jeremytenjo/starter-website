import React from 'react'

import Link from '../../../../../../Link/Link'
import Image from '../../../../../../Image/Image'

export type LogoUiProps = {
  title: string
}

export default function LogoUi() {
  return (
    <Wrapper>
      <Image
        src='/images/logo/logo.svg'
        width={77}
        height={49}
        alt='OnlyFindz beautiful logo'
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
