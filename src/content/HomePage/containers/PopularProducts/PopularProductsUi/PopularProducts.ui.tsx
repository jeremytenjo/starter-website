import React from 'react'
import Box from '@useweb/ui/Box'

import type ProductSchema from '../../../../../data/products/product.schema'
import ProductsList from '../../../../../lib/components/basic/ProductsList/ProductsList'

export type PopularProductsUiProps = {
  popularProducts: ProductSchema[]
}

export default function PopularProductsUi({ popularProducts }: PopularProductsUiProps) {
  return (
    <Wrapper>
      <ProductsList title='Popular Products' products={popularProducts} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='PopularProducts'
      sx={{
        width: '100%',
        display: 'block',
        m: '0 auto',
        maxWidth: '769px',
      }}
    >
      {children}
    </Box>
  )
}
