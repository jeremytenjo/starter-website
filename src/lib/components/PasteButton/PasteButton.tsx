import React from 'react'
import Button from '@mui/material/Button'

export type PasteButtonProps = {
  onPaste: (clipboardData: { clipboardData: any }) => any
  onError?: (error: any) => any
}

export default function PasteButton({ onPaste, onError }: PasteButtonProps) {
  const getLinkFromClipboard = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText()
      onPaste({ clipboardData })
    } catch (error) {
      console.log({ error })
      onError && onError({ error })
    }
  }

  return (
    <Button
      onClick={getLinkFromClipboard}
      variant='contained'
      sx={{
        color: 'black.main',
        backgroundColor: 'white.main',
        mb: 2,
        justifySelf: 'center',
        width: '100%',
      }}
    >
      Paste
    </Button>
  )
}
