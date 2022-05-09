import React from 'react'
import type { Story } from '@ladle/react'

import Typography from '../../../theme/tokens/stories/theme.typography'

import Text, { type TextProps } from './Text'

export default {
  title: 'Lib/Components/Text',
}

const Template: Story<TextProps> = (args) => {
  return (
    <>
      <Text {...args} />
    </>
  )
}

export const Default = Template.bind({})

const defaultArgs: TextProps = { text: 'hello', variant: 'h1' }

Default.args = defaultArgs

export const typography = Typography
