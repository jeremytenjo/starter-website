//https://storybook.js.org/docs/react/writing-docs/docs-page
import React, { useEffect } from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import useUsers from '../../../useUsers/useUsers'
import UsersStubs from '../../../users.stubs'
import Users, { type UsersProps } from '../Users'
import UsersData_ from '../UsersData/UsersData'
import UsersEmptyData_ from '../UsersEmptyData/UsersEmptyData'
import UsersLoading_ from '../UsersLoading/UsersLoading'
import UsersError_ from '../UsersError/UsersError'

const defaultArgs: UsersProps = {
  UseProps: {
    getOptions: {
      onGet: ({ result }) => console.log({ result }),
    },
  },
}

export default {
  title: 'data/Users/ui/Users',
  args: defaultArgs,
}

// full example
const Example = ({ children }) => {
  const usersData = useUsers()

  useEffect(() => {
    usersData.get.exec()
  }, [])

  return <>{children}</>
}

export const UsersExample = {
  render: () => {
    return (
      <>
        <PixelPerfect
          assets={[
            {
              width: 0,
              url: '',
            },
            {
              width: 1920,
              url: '',
            },
          ]}
        />
        <Example>
          <Users />
        </Example>
      </>
    )
  },
}

// data
export const UsersWithData = {
  render: () => {
    return (
      <>
        <PixelPerfect
          assets={[
            {
              width: 0,
              url: '',
            },
            {
              width: 1920,
              url: '',
            },
          ]}
        />

        <UsersData_ {...commonProps} data={UsersStubs} />
      </>
    )
  },
}

// empty data
export const UsersEmptyData = {
  render: () => {
    return (
      <>
        <PixelPerfect
          assets={[
            {
              width: 0,
              url: '',
            },
            {
              width: 1920,
              url: '',
            },
          ]}
        />

        <UsersEmptyData_ {...commonProps} />
      </>
    )
  },
}

// loading
export const UsersLoading = {
  render: () => {
    return (
      <>
        <PixelPerfect
          assets={[
            {
              width: 0,
              url: '',
            },
            {
              width: 1920,
              url: '',
            },
          ]}
        />

        <UsersLoading_ {...commonProps} />
      </>
    )
  },
}

// error
export const UsersError = {
  render: () => {
    return (
      <>
        <PixelPerfect
          assets={[
            {
              width: 0,
              url: '',
            },
            {
              width: 1920,
              url: '',
            },
          ]}
        />

        <UsersError_ {...commonProps} error={new Error('Users failed')} />
      </>
    )
  },
}

const commonProps = {
  exec: () => null,
}
