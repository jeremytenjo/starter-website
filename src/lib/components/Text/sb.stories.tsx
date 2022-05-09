import React from 'react'

import Typography from '../../../theme/tokens/stories/theme.typography'
import { variantNames } from '../../../theme/tokens/typography/typography'

import Text from './Text'

export default {
  title: 'Lib/Components/Text',
}

export const Default = (args) => <Text {...args} />

export const typography = Typography

Default.args = { text: 'hello', variant: 'h1' }

Default.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: variantNames,
    },
  },
}
