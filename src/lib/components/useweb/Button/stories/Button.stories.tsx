import React from 'react'
import Button, { type ButtonProps } from '@useweb/ui/Button'

export default {
  title: 'lib/components/useweb/Button',
}

const Template = (args) => {
  return (
    <>
      <Button {...args}>Button</Button>
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: ButtonProps = {
  name: 'testbutton',
  variant: 'outlined',
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: ButtonProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
