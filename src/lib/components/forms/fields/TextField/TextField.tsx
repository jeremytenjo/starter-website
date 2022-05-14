import React, { useRef } from 'react'
import Box, { type BoxProps } from '@mui/material/Box'
import { IconButton } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import Text from '../../../Text/Text'
import IconxSmall from '../../../icons/IconxSmall'

type Props = {
  name: string
  placeholder?: string
  wrapperSx?: BoxProps['sx']
  id?: string
  inputProps?: object
  required?: string
}

export default function TextField({
  name,
  wrapperSx = {},
  inputProps = {},
  placeholder = '',
  id,
  required,
}: Props) {
  const inputRef = useRef<any>(null)
  const {
    register,
    watch,
    setValue,
    formState: { errors = {} },
  } = useFormContext()
  const { ref, ...restRegister } = register(name, {
    required,
  })
  const value = watch(name)
  const error = errors[name]

  const clearInput = () => {
    setValue(name, '', { shouldValidate: true })
    inputRef.current && inputRef.current.focus()
  }

  return (
    <Box
      sx={{
        display: 'grid',
        ...wrapperSx,
      }}
    >
      <Box
        id={id}
        sx={{
          display: 'grid',
          backgroundColor: 'white.main',
          padding: '4px',
          width: 'fit-content',
          borderRadius: '9px',
          transition: '0.2s',
          border: '2px solid white',
          gridAutoFlow: 'column',
          justifyContent: 'space-between',
          gridTemplateColumns: '1fr fit-content(100%)',
          gap: 1,
          '&:focus': {
            borderColor: 'primary.main',
          },
        }}
      >
        <Box
          component='input'
          placeholder={placeholder}
          {...restRegister}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
          sx={{
            outline: 'none',
            border: 'none',
            fontSize: '16px',
          }}
          {...inputProps}
        />

        <IconButton
          aria-label='reset'
          onClick={clearInput}
          sx={{
            visibility: value !== '' ? 'visible' : 'hidden',
          }}
        >
          <IconxSmall sx={{ width: '18px', height: '18px' }} />
        </IconButton>
      </Box>

      {error && error.type === 'required' && value === '' && (
        <Text
          text={error.message}
          sx={{
            color: 'error.main',
            mt: 2,
          }}
        />
      )}
    </Box>
  )
}
