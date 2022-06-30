import React from 'react'
import useSnackbar, { SnackbarProvider } from '@useweb/ui/Snackbar'

export default {
  title: 'lib/components/useweb/Snackbar',
  args: {},
}

const Provider = ({ children }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>
}

const Child = () => {
  const snackbar = useSnackbar()

  const trigger = () => {
    snackbar.show({
      message: `This is a snackbar`,
    })
  }

  return (
    <div>
      <button onClick={trigger}>Show</button>
    </div>
  )
}

export const Example = {
  render: () => {
    return (
      <Provider>
        <Child />
      </Provider>
    )
  },
}
