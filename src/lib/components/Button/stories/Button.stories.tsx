// https://www.ladle.dev/docs/stories
import React from 'react'
import type { Story } from '@ladle/react'
import Button, { type ButtonProps } from '@mui/material/Button'

export default {
  title: 'Lib/components/Button',
}

const Template: Story<ButtonProps> = (args) => {
  return (
    <>
      <Button {...args}>Button</Button>
    </>
  )
}

export const Default = Template.bind({})

const defaultArgs: ButtonProps = {
  variant: 'outlined',
}

Default.args = defaultArgs

// export const Variant = Template.bind({})

// const VariantArgs: ButtonProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
