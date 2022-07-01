import React, { useState } from 'react'
import Box from '@useweb/ui/Box'

import GlobalSearchBar from '../../../../../components/basic/GlobalSearchBar/GlobalSearchBar'
import type ProductSchema from '../../../../../../data/products/product.schema'

import MobileHeader from './containers/MobileHeader/MobileHeader'
import DesktopHeader from './containers/DesktopHeader/DesktopHeader'

export type RootHeaderUiProps = {
  products: ProductSchema[]
  navLinks: {
    id: string | number
    label: string
    url: string
  }[]
}

export default function RootHeaderUi({
  products = [],
  navLinks = [],
}: RootHeaderUiProps) {
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
