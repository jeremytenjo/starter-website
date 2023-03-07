/* eslint-disable storybook/prefer-pascal-case */
import React from 'react'
import Text, { type TextProps } from '@useweb/ui/Text'

import Typography from '../../../../theme/tokens/stories/theme.typography'

const defaultArgs: TextProps = { text: 'hello', variant: 'h1' }

export default {
  title: 'lib/components/useweb/Text',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

export const Default = {
  render: (args) => {
    return (
      <>
        <Text {...args} />
      </>
    )
  },
}

export const typography = Typography
