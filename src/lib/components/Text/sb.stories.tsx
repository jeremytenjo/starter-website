/* eslint-disable storybook/prefer-pascal-case */
import React from 'react'

import Typography from '../../../theme/tokens/stories/theme.typography'

import Text, { type TextProps } from './Text'

const defaultArgs: TextProps = { text: 'hello', variant: 'h1' }

export default {
  title: 'Lib/Components/Text',
  args: defaultArgs,
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
