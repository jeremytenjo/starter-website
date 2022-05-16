import React from 'react'
import Box from '@mui/material/Box'

import TextField from '../TextField/TextField'
import PasteButton from '../../../PasteButton/PasteButton'

export type TextFieldPasteProps = {
  onPaste: (clipboardData: { clipboardData: any }) => any
  name: string
  placeholder: string
  required?: string
  onChange?: (newValue: any) => any
  onInputClear?: () => any
  LeftIcon?: any
  inputProps?: any
}

export default function TextFieldPaste({
  onPaste,
  required,
  name,
  placeholder,
  onChange,
  onInputClear,
  LeftIcon,
  inputProps = {},
}: TextFieldPasteProps) {
  const getLinkFromClipboard = ({ clipboardData, updateTextFieldValue }) => {
    try {
      onPaste({ clipboardData })
      updateTextFieldValue(clipboardData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'space-between',
        gridTemplateColumns: '1fr fit-content(100%)',
        gap: 1,
      }}
    >
      <TextField
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onInputClear={onInputClear}
        LeftIcon={LeftIcon}
        wrapperSx={{
          width: '100%',
          mb: 2,
        }}
        inputProps={{
          autoComplete: 'off',
          ...inputProps,
        }}
        Sibling={({ updateTextFieldValue }) => {
          return (
            <PasteButton
              onPaste={({ clipboardData }) =>
                getLinkFromClipboard({ clipboardData, updateTextFieldValue })
              }
            />
          )
        }}
      />
    </Box>
  )
}
