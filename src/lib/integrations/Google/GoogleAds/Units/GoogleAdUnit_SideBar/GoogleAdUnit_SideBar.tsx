import React from 'react'

import GoogleAdUnit, { type GoogleAdUnitProps } from '../../GoogleAdUnit/GoogleAdUnit'

export default function GoogleAdUnit_SideBar() {
  const data: GoogleAdUnitProps = {
    dataAdSlot: '',
    dataAdFormat: '',
  }

  return <GoogleAdUnit {...data} />
}
