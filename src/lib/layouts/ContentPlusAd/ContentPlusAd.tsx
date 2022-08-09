import React from 'react'
import Box, { BoxProps } from '@useweb/ui/Box'

import CenterColumn from '../CenterColumn/CenterColumn'
import GoogleAdUnit_SideBar from '../../integrations/Google/GoogleAds/Units/GoogleAdUnit_SideBar/GoogleAdUnit_SideBar'

export type ContentPlusAdProps = { sx?: BoxProps['sx']; children: any }

export default function ContentPlusAd(props: ContentPlusAdProps) {
  return (
    <CenterColumn
      dataId='ContentPlusAd'
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          md: '0.6fr 0.4fr',
        },
        gap: '30px',
        ...(props.sx || {}),
      }}
    >
      <Box>{props.children}</Box>

      <Box>
        <GoogleAdUnit_SideBar />
      </Box>
    </CenterColumn>
  )
}
