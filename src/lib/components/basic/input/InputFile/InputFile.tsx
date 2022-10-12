import React from 'react'
import Button, { type ButtonProps } from '@useweb/ui/Button'

export type InputFileProps = {
  onFileInput: ({ file }: { file: File }) => any
  label?: string
  sx?: ButtonProps['sx']
  inputProps?: React.HTMLProps<HTMLInputElement>
  buttonProps?: ButtonProps
}

export default function InputFile(props: InputFileProps) {
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e?.target?.files?.[0]

    if (file) {
      props.onFileInput({ file })
    }
  }
  return (
    <Button
      data-id='InputFile'
      component='label'
      variant='contained'
      sx={{
        width: 'fit-content',
        ...(props.sx || {}),
      }}
      {...(props.buttonProps || {})}
      name='InputFile'
    >
      {props.label || 'Input File'}
      <input
        hidden
        type='file'
        onChange={onFileInput}
        onClick={(e: any) => {
          e.target.value = null
        }}
        {...(props.inputProps || {})}
      />
    </Button>
  )
}
