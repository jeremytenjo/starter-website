/* eslint-disable storybook/prefer-pascal-case */
import React from 'react'
import FileInput from '@useweb/ui/FileInput'

import Typography from '../../../../theme/tokens/stories/theme.typography'

export default {
  title: 'lib/components/useweb/FileInput',
}

export const Default = {
  render: (args) => {
    return (
      <>
        <FileInput {...args} />
      </>
    )
  },
}

export const typography = Typography
