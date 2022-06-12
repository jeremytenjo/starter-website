import React from 'react'
import Alert from '@useweb/alert'

export default {
  title: 'lib/components/Alert',
  args: {
    children: 'Hello snackbar!',
  },
}

export const Example = {
  render: (args: any) => {
    return <Alert {...args} />
  },
}
