import React, { useState } from 'react'
import Box from '@mui/material/Box'

import GlobalSearchBar from '../GlobalSearchBar/GlobalSearchBar'
import type ProductSchema from '../../../data/products/product.schema'

import MobileHeader from './containers/MobileHeader/MobileHeader'
import DesktopHeader from './containers/DesktopHeader/DesktopHeader'

export type HeaderProps = {
  products: ProductSchema[]
  navLinks: {
    id: string | number
    label: string
    url: string
  }[]
}

export default function Header({ products = [], navLinks = [] }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const onShowSearchBarClick = () => {
    setOpen(true)
  }

  const closeSearch = () => {
    setOpen(false)
  }

  return (
    <Wrapper>
      <MobileHeader links={navLinks} onShowSearchBarClick={onShowSearchBarClick} />
      <DesktopHeader
        links={navLinks}
        onShowSearchBarClick={onShowSearchBarClick}
        data={products}
      />

      <GlobalSearchBar open={open} onClose={closeSearch} data={products} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return <Box data-id='Header'>{children}</Box>
}