import React, { useMemo, useState } from 'react'
import Box, { type BoxProps } from '@useweb/box'
import Text from '@useweb/text'
import List from '@useweb/list'
import Form from '@useweb/form'

import TextFieldPaste from '../useweb/forms/fields/TextFieldPaste/TextFieldPaste'
import IconSearch from '../icons/IconSearch'

export type AutocompleteProps = {
  data: any[]
  filterFn: ({ query, listItem }) => boolean
  ListItemComponent: any
  placeholder: string
  sx?: BoxProps['sx']
  resultsSx?: BoxProps['sx']
  inputProps?: any
}

export default function Autocomplete({
  data = [],
  filterFn,
  ListItemComponent,
  placeholder,
  sx = {},
  resultsSx = {},
  inputProps = {},
}: AutocompleteProps) {
  const [value, setValue] = useState('')

  return (
    <Wrapper sx={sx}>
      <Form onSubmit={(values) => setValue(values.autocompleteInput)}>
        <TextFieldPaste
          name='autocompleteInput'
          placeholder={placeholder}
          onPaste={({ clipboardData }) => setValue(clipboardData)}
          onChange={(newValue) => setValue(newValue)}
          onInputClear={() => setValue('')}
          LeftIcon={<IconSearch />}
          inputProps={inputProps}
        />
      </Form>

      <Results
        query={value}
        filterFn={filterFn}
        data={data}
        ListItemComponent={ListItemComponent}
        resultsSx={resultsSx}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children, sx }) => {
  return (
    <Box
      data-id='Autocomplete'
      sx={{
        p: '20px',
        display: 'grid',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

const Results = ({ query, data, ListItemComponent, resultsSx, filterFn }) => {
  const filteredData = useMemo(() => {
    if (query === '') {
      return []
    }

    const filtered = data.filter((d) => filterFn({ query, listItem: d }))

    if (filtered.length === 0) {
      return []
    }

    return filtered
  }, [query, data])

  return query !== '' ? (
    <Box
      sx={{
        backgroundColor: 'white.main',
        borderRadius: '9px',
        color: 'black.main',
        p: 2,
        maxHeight: {
          xs: '300px',
          lg: '500px',
        },
        overflow: 'auto',
      }}
    >
      {!!filteredData.length && (
        <List
          data={filteredData}
          ListItemComponent={ListItemComponent}
          sx={{
            overflow: 'auto',
            gap: '30px',
            ...resultsSx,
          }}
        />
      )}

      {!filteredData.length && <Text text='No results found' />}
    </Box>
  ) : null
}
