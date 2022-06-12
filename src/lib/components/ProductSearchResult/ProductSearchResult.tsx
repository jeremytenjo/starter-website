import React from 'react'
import Box from '@useweb/box'
import Text from '@useweb/text'

import Image from '../Image/Image'
import type ProductSchema from '../../../data/products/product.schema'
import Link from '../Link/Link'
import getProductUrlId from '../../../data/products/utils/getProductUrlId/getProductUrlId'
import BuyButton from '../BuyButton/BuyButton'

export type ProductSearchResultProps = ProductSchema & {
  onClick?: () => any
}

export default function ProductSearchResult(product: ProductSearchResultProps) {
  return (
    <Wrapper onClick={product.onClick}>
      <Link
        href={`/products/${getProductUrlId({ product })}`}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gap: '10px',
          alignSelf: 'start',
          gridTemplateColumns: '80px 1fr',
          '& img': {
            borderRadius: '9px',
            objectFit: 'contain',
          },
        }}
      >
        <Image
          src={product.data.image.url}
          width={80}
          height={80}
          alt={`${product.data.name} photo`}
        />

        <Box
          sx={{
            maxHeight: '100px',
            overflow: 'hidden',
            alignSelf: 'center',
          }}
        >
          <Text
            text={product.data.name}
            sx={{
              fontSize: {
                xs: '14px',
                lg: '16px',
              },
              textOverflow: 'ellipsis',
            }}
          />
        </Box>
      </Link>

      <BuyButton
        storeLink={product.data.affiliateLinkUS}
        sx={{
          m: '0',
          alignSelf: 'center',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children, onClick }) => {
  return (
    <Box
      onClick={onClick}
      data-id='ProductSearchResult'
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        minHeight: '80px',
        gap: '10px',
        gridTemplateColumns: '1fr fit-content(100%)',
      }}
    >
      {children}
    </Box>
  )
}
