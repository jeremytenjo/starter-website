import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import List from '@useweb/ui/List'

import type ProductSchema from '../../../data/products/product.schema'
import ProductButton from '../ProductButton/ProductButton'

export type ProductsListProps = { title?: string; products: ProductSchema[] }

export default function ProductsList({ title, products = [] }: ProductsListProps) {
  return (
    <Wrapper>
      {title && (
        <Text
          text={title}
          sx={{
            fontFamily: 'PoppinsRegular',
            fontSize: '16px',
            mt: '53px',
            mb: '15px',
          }}
        />
      )}

      <List
        data={products}
        ListItemComponent={ProductButton}
        sx={{
          gridTemplateColumns: {
            xs: '1fr 1fr',
            md: 'repeat(auto-fill, minmax(150px, 1fr) )',
          },
          justifyContent: { lg: 'space-between' },
          gap: '10px',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ProductsList' sx={{}}>
      {children}
    </Box>
  )
}
