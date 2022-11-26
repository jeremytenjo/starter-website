/* eslint-disable storybook/prefer-pascal-case */
import React from 'react'
import InputFile from '@useweb/ui/InputFile'

import Typography from '../../../../theme/tokens/stories/theme.typography'

export default {
  title: 'lib/components/useweb/InputFile',
}

export const Default = {
  render: (args) => {
    return (
      <>
        <InputFile {...args} />
      </>
    )
  },
}

export const typography = Typography
