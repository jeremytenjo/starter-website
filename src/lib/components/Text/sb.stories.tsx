import React from 'react'

import Typography from '../../../theme/tokens/stories/theme.typography'
import { variantNames } from '../../../theme/tokens/typography/typography'

import Text from './Text'

export default {
  title: 'Lib/Components/Text',
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: variantNames,
      },
    },
  },
  args: { text: 'hello', variant: 'h1' },
}

const Template = (args) => {
  return <Text {...args} />
}
export const Default = Template.bind({})

export { Typography }
