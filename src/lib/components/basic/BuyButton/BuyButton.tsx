import React from 'react'
import Button, { type ButtonProps } from '@useweb/ui/Button'
import Link from '@useweb/ui/LinkNext'

import { clickedBuyButton } from '../../../utils/googleAnalytics/gtag/gtag'

export type BuyButtonProps = { storeLink: string; sx?: ButtonProps['sx'] }

export default function BuyButton({ storeLink = '/', sx = {} }: BuyButtonProps) {
  const onClick = () => {
    clickedBuyButton({ storeLink })
  }

  return (
    <Link
      onClick={onClick}
      href={storeLink}
      newTab
      sx={{
        mx: '20px',
        mb: '15px',
        mt: '17px',
        justifySelf: 'center',
        ...sx,
      }}
    >
      <Button
        name='Buy Button'
        sx={{
          color: 'white.main',
          backgroundColor: 'primary.main',
          whiteSpace: 'nowrap',
          maxWidth: '140px',
          fontSize: {
            xs: '12px',
          },
          '&:hover': {
            backgroundColor: 'primary.main',
          },
        }}
      >
        Buy on Amazon
      </Button>
    </Link>
  )
}
