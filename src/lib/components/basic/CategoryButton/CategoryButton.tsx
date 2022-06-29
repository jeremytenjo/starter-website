import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/LinkNext'
import Image from 'next/image'

import type ProductCategoriesSchema from '../../../../data/products/productCategory/productCategory.schema'
import getProductCategoriesUrlId from '../../../../data/products/productCategory/getProductCategoryUrlId/getProductCategoryUrlId'

export type CategoryButtonProps = ProductCategoriesSchema

export default function CategoryButton(category: CategoryButtonProps) {
  return (
    <Wrapper category={category}>
      <Image
        src={category.data.backgroundImage.url}
        alt={`${category.data.name} thumb image`}
        width={300}
        height={300}
      />

      <Box
        sx={{
          position: 'absolute',
          top: { xs: '50%', lg: 'auto' },
          left: { xs: '50%', lg: '20px' },
          bottom: { xs: 'auto', lg: '20px' },
          transform: { xs: 'translate(-50%, -50%)', lg: 'none' },
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Text
          text={category.data.name}
          sx={{
            fontSize: {
              xs: '18.69px',
              lg: '20.87px',
            },
            fontFamily: 'PoppinsRegular',
            color: 'white.main',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Overlay */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
          position: 'absolute',
          inset: '0',
          zIndex: 1,
          pointerEvents: 'none',
          background: {
            lg: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(25, 19, 64, 0.24) 100%)',
          },
        }}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children, category }) => {
  const href = getProductCategoriesUrlId({ category })

  return (
    <Link
      href={`/categories/${href}`}
      data-id='CategoryButton'
      sx={{
        display: 'block',
        overflow: 'hidden',
        borderRadius: '5.02199px',
        position: 'relative',
        aspectRatio: '1/1',
        '& img': {
          borderRadius: '5.02199px',
          objectFit: 'cover',
          transition: '0.4s',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      {children}
    </Link>
  )
}
