import React from 'react'
import Box from '@useweb/box'

import List from '../../../../../lib/components/List/List'
import type ProductCategoriesSchema from '../../../../../data/products/productCategory/productCategory.schema'
import CategoryButton from '../../../../../lib/components/CategoryButton/CategoryButton'

export type CategoriesUiProps = {
  categories: ProductCategoriesSchema[]
}

export default function CategoriesUi({ categories = [] }: CategoriesUiProps) {
  return (
    <Wrapper>
      <List
        data={categories}
        ListItemComponent={CategoryButton}
        sx={{
          gridTemplateColumns: {
            xs: 'repeat(auto-fill, minmax(100px, 1fr) )',
            lg: 'auto',
          },
          justifyContent: { lg: 'space-between' },
          gridAutoFlow: { lg: 'column' },
          gap: '10px',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Categories'
      sx={{
        display: 'block',
        m: '0 auto',
        width: '100%',
        maxWidth: '769px',
      }}
    >
      {children}
    </Box>
  )
}
