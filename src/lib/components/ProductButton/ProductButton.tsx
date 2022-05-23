import React from 'react'
import Box from '@mui/material/Box'

import type ProductSchema from '../../../data/products/product.schema'
import Image from '../Image/Image'
import Text from '../Text/Text'
import Link from '../Link/Link'
import getProductUrlId from '../../../data/products/utils/getProductUrlId/getProductUrlId'
import BuyButton from '../BuyButton/BuyButton'

export type ProductButtonProps = ProductSchema

export default function ProductButton(product: ProductButtonProps) {
  return (
    <Wrapper>
      <Link href={`/products/${getProductUrlId({ product })}`}>
        <ProductImage url={product.data.image.url} name={product.data.name} />
        <ProductName name={product.data.name} />
      </Link>
      <BuyButton storeLink={product.data.affiliateLinkUS} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='ProductButton'
      sx={{
        borderRadius: '8px',
        border: 'red solid 3px',
        borderColor: 'grey.main',
        maxWidth: '350px',
        display: 'grid',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
      }}
    >
      {children}
    </Box>
  )
}

const ProductImage = ({ name, url }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white.main',
        p: '15px',
        display: 'grid',
        alignItems: 'center',
        borderRadius: '5px',
        mb: '7px',
        '& img': {
          objectFit: 'contain',
        },
      }}
    >
      <Image src={url} alt={`${name} thumb image`} width={300} height={300} />
    </Box>
  )
}

const ProductName = ({ name }) => {
  return (
    <Box
      sx={{
        height: '100px',
        overflow: 'hidden',
        px: '10px',
        overflowY: 'auto',
      }}
    >
      <Text
        text={name}
        sx={{
          textOverflow: 'ellipsis',
          textAlign: 'start',
          overflow: 'hidden',
        }}
      />
    </Box>
  )
}
