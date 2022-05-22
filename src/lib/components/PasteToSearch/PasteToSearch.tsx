import React from 'react'
import Box, { type BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'

import PasteButton from '../PasteButton/PasteButton'
import findLinkFromTikTokLink from '../../utils/tiktok/findAffiliateLinkFromTikTokLink/findAffiliateLinkFromTikTokLink'
import type ProductSchema from '../../../data/products/product.schema'
import useSnackbar from '../Snackbar/Snackbar'

export type PasteToSearchProps = { data: ProductSchema[]; sx?: BoxProps['sx'] }

export default function PasteToSearch({ data, sx = {} }: PasteToSearchProps) {
  const snackbar = useSnackbar()

  const handlePaste = ({ clipboardData }) => {
    const affiliateLink = findLinkFromTikTokLink({ data, tikTokLink: clipboardData })

    if (affiliateLink) {
      window.open(affiliateLink, '_blank')
    } else {
      snackbar.show({ message: `Could not find product for: ${clipboardData}` })
    }
  }

  return (
    <Wrapper>
      <PasteButton
        text='Paste tiktok link to go directly to the product'
        onPaste={handlePaste}
        sx={{
          ...sx,
        }}
      />

      <Button
        sx={{
          backgroundColor: 'grey.one',
          color: 'grey.two',
          fontSize: '10px',
          width: 'fit-content',
          fontWeight: 'lighter',
          '&:hover': {
            backgroundColor: 'grey.one',
          },
        }}
      >
        how to get tiktok link?
      </Button>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='PasteToSearch'
      sx={{
        display: 'grid',
        justifyItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}
