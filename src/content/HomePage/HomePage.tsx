import React from 'react'
import Box from '@mui/material/Box'

import Categories from './containers/Categories/Categories'
import PopularProducts from './containers/PopularProducts/PopularProducts'

export default function HomePageContent() {
  return (
    <Wrapper>
      <Categories />
      <PopularProducts />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='HomePageContent' sx={{}}>
      {children}
    </Box>
  )
}
