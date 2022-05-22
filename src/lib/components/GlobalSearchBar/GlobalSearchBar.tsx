import React from 'react'
import Dialog from '@mui/material/Dialog'

import Autocomplete from '../Autocomplete/Autocomplete'
import ProductSearchResult from '../ProductSearchResult/ProductSearchResult'
import type ProductSchema from '../../../data/products/product.schema'

export type GlobalSearchBarProps = { data: any[]; open: boolean; onClose: any }

export default function GlobalSearchBar({ data, open, onClose }: GlobalSearchBarProps) {
  return (
    <Dialog data-id='GlobalSearchBar' open={open} onClose={onClose} sx={DialogSx}>
      <Autocomplete
        data={data}
        filterFn={({ query, listItem }: { query: string; listItem: ProductSchema }) =>
          listItem.data.name.toLowerCase().includes(query.toLowerCase())
        }
        ListItemComponent={(props) => (
          <ProductSearchResult {...props} onClick={onClose} />
        )}
        placeholder='Search by name or paste TikTok link'
        inputProps={{
          autoFocus: true,
        }}
      />
    </Dialog>
  )
}

const DialogSx = {
  '& .MuiDialog-container': {
    alignItems: 'flex-start',
  },
  '& .MuiPaper-elevation': {
    m: 0,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '100%',
    mt: {
      lg: '100px',
    },
  },
}
