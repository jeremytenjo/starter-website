//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getSingleUser, {
  type GetSingleUserProps,
  type GetSingleUserReturn,
} from '../getSingleUser'
import userStubs from '../../../users.stubs'

const defaultArgs: GetSingleUserProps = {
  uid: userStubs[0].uid,
}

export default {
  title: 'data/users/getSingleUser',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await getSingleUser({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetSingleUserReturn, GetSingleUserProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: GetSingleUserProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
