import React from 'react'

import Link from '../../../../../../../../../components/basic/misc/Link/Link'
import Image from '../../../../../../../../../components/basic/misc/Image/Image'
import appConfig from '../../../../../../../../../../../app.config.cjs'

export type LogoUiProps = {
  src: string
}

export default function LogoUi(props: LogoUiProps) {
  return (
    <Wrapper>
      <Image
        src={props.src}
        width={77}
        height={49}
        alt={`${appConfig.siteInfo.name} beautiful logo`}
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
