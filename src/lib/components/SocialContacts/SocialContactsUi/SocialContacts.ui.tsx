import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import Link from '../../Link/Link'

export type SocialContactsUiProps = {
  accountLinks: {
    url: string
    icon: any
    hoverColor: any
  }[]
}

export default function SocialContactsUi({ accountLinks }: SocialContactsUiProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        width: 'fit-content',
        gridGap: '14px',
      }}
    >
      {accountLinks.map((accountLink) => {
        const Icon = accountLink.icon
        return (
          <Link key={accountLink.url} href={accountLink.url} newTab>
            <IconButton
              sx={{
                width: '32px',
                height: '32px',
                '& svg': {
                  fill: 'black',
                  transition: '0.2s',
                },
                ':hover': {
                  '& svg': {
                    fill: accountLink.hoverColor,
                  },
                },
              }}
            >
              <Icon
                sx={{
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            </IconButton>
          </Link>
        )
      })}
    </Box>
  )
}
