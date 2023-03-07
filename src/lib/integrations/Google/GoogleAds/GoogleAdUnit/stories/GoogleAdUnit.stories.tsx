//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import GoogleAdUnit, { type GoogleAdUnitProps } from '../GoogleAdUnit'

const defaultArgs: GoogleAdUnitProps = {
  dataAdFormat: '',
  dataAdLayoutKey: '',
  dataAdSlot: '',
}

export default {
  title: 'lib/components/integrations/google/googleAds/GoogleAdUnit',
  args: defaultArgs,
}

const Template = (args) => {
  return (
    <>
      <GoogleAdUnit {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: GoogleAdUnitProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
