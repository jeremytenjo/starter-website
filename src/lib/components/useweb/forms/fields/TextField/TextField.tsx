import React, { useRef } from 'react'
import Box, { type BoxProps } from '@useweb/box'
import IconButton from '@useweb/icon-button'
import Text from '@useweb/text'
import { useFormContext } from 'react-hook-form'

import IconxSmall from '../../../../icons/IconxSmall'

type Props = {
  name: string
  placeholder?: string
  wrapperSx?: BoxProps['sx']
  id?: string
  inputProps?: object
  required?: string
  Sibling?: any
  onChange?: (newValue: any) => any
  onInputClear?: () => any
  LeftIcon?: any
}

export default function TextField({
  name,
  wrapperSx = {},
  inputProps = {},
  placeholder = '',
  id,
  required,
  Sibling,
  onChange = () => null,
  onInputClear = () => null,
  LeftIcon,
}: Props) {
  const inputRef = useRef<any>(null)
  const {
    register,
    watch,
    setValue,
    formState: { errors = {} },
    getValues,
  } = useFormContext()
  const { ref, ...restRegister } = register(name, {
    required,
    onChange: () => onChange(getValues(name)),
  })
  const value = watch(name)
  const error = errors[name]

  const clearInput = () => {
    setValue(name, '', { shouldValidate: true })
    inputRef.current && inputRef.current.focus()
    onInputClear()
  }

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          width: 'fit-content',
          ...wrapperSx,
        }}
      >
        <Box
          id={id}
          sx={{
            display: 'grid',
            backgroundColor: 'white.main',
            padding: '4px',
            borderRadius: '9px',
            transition: '0.2s',
            py: 1,
            border: '2px solid white',
            borderColor: 'grey.light',
            gridAutoFlow: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gridTemplateColumns: LeftIcon
              ? 'fit-content(100%) 1fr fit-content(100%)'
              : '1fr fit-content(100%)',
            gap: 1,
            '&:focus': {
              borderColor: 'primary.main',
            },
          }}
        >
          {LeftIcon && (
            <Box
              sx={{
                pl: '9px',
                display: 'grid',
                alignItems: 'center',
                '& svg': {
                  width: '20px',
                  height: '20px',
                },
              }}
            >
              {LeftIcon}
            </Box>
          )}

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
              minWidth: 'fill-available',
            }}
            {...inputProps}
          />

          <IconButton
            name='Textfield button'
            aria-label='reset'
            onClick={clearInput}
            sx={{
              visibility: value !== '' ? 'visible' : 'hidden',
              width: '24px',
              height: '24px',
              border: 'none',
              display: 'grid',
              alignItems: 'center',
              p: '0px',
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
      {Sibling && (
        <Sibling updateTextFieldValue={(newValue) => setValue(name, newValue)} />
      )}
    </>
  )
}
