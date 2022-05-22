import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

import GlobalSearchBar from '../GlobalSearchBar/GlobalSearchBar'
import PasteToSearch from '../PasteToSearch/PasteToSearch'
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

      <PosteToSearchProduct data={products} />

      <GlobalSearchBar open={open} onClose={closeSearch} data={products} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return <Box data-id='Header'>{children}</Box>
}

const PosteToSearchProduct = ({ data }) => {
  const router = useRouter()
  const disable = true
  const enable = router.pathname === '/' && !disable

  return enable ? (
    <Box
      sx={{
        display: 'block',
        m: '0 auto',
        maxWidth: '350px',
        px: {
          xs: '10px',
          lg: '20px',
        },
        mt: {
          xs: '10px',
          lg: '30px',
        },
        mb: {
          xs: '40px',
          lg: '60px',
        },
      }}
    >
      <PasteToSearch
        data={data}
        sx={{
          mb: '3px',
          color: 'grey.two',
          fontSize: '11px',
          boxShadow: 'none',
          width: '100%',
          border: '0.985222px solid #E6E6E6',
          '&: active': {
            boxShadow: 'none',
          },
          '&: hover': {
            boxShadow: 'none',
          },
        }}
      />
    </Box>
  ) : null
}
