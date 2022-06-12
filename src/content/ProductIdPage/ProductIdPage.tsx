import React from 'react'
import Box from '@useweb/box'
import Text from '@useweb/text'

import ProductsList from '../../lib/components/ProductsList/ProductsList'
import type ProductSchema from '../../data/products/product.schema'
import BuyButton from '../../lib/components/BuyButton/BuyButton'

import useProductIdPageProps from './ProductIdPageProps/useProductIdPageProps'

export default function ProductIdPageContent() {
  const pageProps = useProductIdPageProps()

  return (
    <Wrapper>
      <ProductName name={pageProps.product.data.name} />
      <ProductInfo product={pageProps.product} />
      <SimilarProducts similarProducts={pageProps.similarProducts} />
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

const ProductName = ({ name }) => {
  return (
    <Box
      sx={{
        m: '0 auto',
        mb: {
          xs: '40px',
          lg: '50px',
        },
      }}
    >
      <Text
        text={name}
        sx={{
          fontFamily: 'PoppinsRegular',
          fontSize: {
            xs: '20px',
            lg: '26px',
          },
          textAlign: 'center',
        }}
      />
    </Box>
  )
}

const ProductInfo = ({ product }: { product: ProductSchema }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: {
          lg: 'column',
        },
        gridTemplateColumns: {
          lg: '1fr 420px',
        },
        justifyItems: 'center',
        gap: '24px',
      }}
    >
      <Box>
        <Text
          text={product.data.Description}
          sx={{
            color: 'grey.two',
          }}
        />
        <BuyButton
          storeLink={product.data.affiliateLinkUS}
          sx={{
            display: {
              xs: 'none',
              lg: 'block',
            },
            mx: '0',
            mt: '20px',
            width: 'fit-content',
            '& button': {
              fontSize: '16px',
              maxWidth: 'none',
            },
          }}
        />

        <Box
          sx={{
            backgroundColor: 'primary.main',
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            height: '50px',
            zIndex: '3',
            display: {
              lg: 'none',
            },
          }}
        >
          <BuyButton
            storeLink={product.data.affiliateLinkUS}
            sx={{
              m: '0',
              '& button': {
                fontSize: '18.6px',
                maxWidth: 'none',
                height: '100%',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

const SimilarProducts = ({ similarProducts }) => {
  return similarProducts.length ? (
    <Box
      sx={{
        mt: {
          xs: '50px',
          lg: '190px',
        },
      }}
    >
      <ProductsList title='Similar Products' products={similarProducts} />
    </Box>
  ) : null
}
