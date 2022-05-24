import React from 'react'
import Header from '../Header'
export default {
  title: 'Lib/components/Header',
}

const Template = (args) => {
  return (
    <>
      <Header {...args} />
    </>
  )
}

export const Default = Template.bind({}) as any
const defaultArgs = {
  name: 'Header',
}
Default.args = defaultArgs // export const Variant = Template.bind({}) as any
// const VariantArgs: HeaderProps = {
//  ...defaultArgs,
//  name: 'World',
// }
// Variant.args = VariantArgs
