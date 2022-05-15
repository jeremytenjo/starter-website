import React from 'react'
import Box from '@mui/material/Box'

import TextField from '../TextField/TextField'
import PasteButton from '../../../PasteButton/PasteButton'

export type TextFieldPasteProps = {
  onPaste: (clipboardData: { clipboardData: any }) => any
  name: string
  placeholder: string
  required?: string
}

export default function TextFieldPaste({
  onPaste,
  required,
  name,
  placeholder,
}: TextFieldPasteProps) {
  const getLinkFromClipboard = ({ clipboardData }) => {
    try {
      onPaste({ clipboardData })
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
        wrapperSx={{
          width: '100%',
          mb: 2,
        }}
        inputProps={{
          autoComplete: 'off',
        }}
      />

      <PasteButton onPaste={getLinkFromClipboard} />
    </Box>
  )
}
