import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import ProductsList from '../../lib/components/ProductsList/ProductsList'

import useCategoryIdProps from './useCategoryIdProps/useCategoryIdProps'

export default function CategoryIdContent() {
  const pageProps = useCategoryIdProps()

  return (
    <Wrapper>
      <CategoryName name={pageProps.productCategory.data.name} />
      <ProductInCategory products={pageProps.categoryProducts} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'block',
        margin: '0 auto',
        maxWidth: '769px',
        mt: {
          xs: '20px',
          lg: '50px',
        },
      }}
    >
      {children}
    </Box>
  )
}

const CategoryName = ({ name }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        width: 'fit-content',
        gap: '11px',
        m: '0 auto',
        mb: {
          xs: '40px',
          lg: '50px',
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: 'grey.light',
          height: '3px',
          width: '17px',
        }}
      />
      <Text
        text={name}
        sx={{
          fontWeight: 'bold',
          fontSize: '21px',
        }}
      />
      <Box
        sx={{
          backgroundColor: 'grey.light',
          height: '3px',
          width: '17px',
        }}
      />
    </Box>
  )
}

const ProductInCategory = ({ products }) => {
  return (
    <Box sx={{}}>
      <ProductsList products={products || []} />
    </Box>
  )
}
