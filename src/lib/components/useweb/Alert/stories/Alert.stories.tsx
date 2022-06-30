import React from 'react'
import Alert, { type AlertProps } from '@useweb/ui/Alert'

export default {
  title: 'Lib/components/useweb/Alert',
}

const Template = (args) => {
  return (
    <>
      <Alert {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any

const defaultArgs: AlertProps = {
  children: <p>Hello Alert</p>,
}

Default.args = defaultArgs

// export const Variant = Template.bind({}) as any

// const VariantArgs: AlertProps = {
//  ...defaultArgs,
//  name: 'World',
// }

// Variant.args = VariantArgs
