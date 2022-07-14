import React from 'react'

import SiteLogo from '../../../../../../../../../components/basic/misc/SiteLogo/SiteLogo'

export type LogoUiProps = {
  src?: string
}

export default function LogoUi(props: LogoUiProps) {
  return (
    <>
      <SiteLogo src={props.src} width={164} height={68} />
    </>
  )
}
