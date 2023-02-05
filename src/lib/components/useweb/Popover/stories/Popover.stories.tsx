import React from 'react'
import Popover, { type PopoverProps } from '@useweb/ui/Popover'

export default {
  title: 'lib/components/useweb/Popover',
}

const Template = (args) => {
  return (
    <>
      <Popover {...args}>Popover</Popover>
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: PopoverProps = {
  trigger: <div>trigger popover</div>,
  children: <div>Hello popover</div>,
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: PopoverProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
