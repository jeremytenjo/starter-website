//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import GlobalErrorLogger, { type GlobalErrorLoggerProps } from '../GlobalErrorLogger'

const Hello = () => {
  throw new Error('Hello Test Error')
}

const defaultArgs: GlobalErrorLoggerProps = {
  children: <Hello />,
}

export default {
  title: 'lib/utils/loggers/logError/Global Error Logger',
  component: GlobalErrorLogger,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GlobalErrorLoggerProps) => {
  return (
    <>
      <GlobalErrorLogger {...args} />
    </>
  )
}

export const Default = {
  render: (args: GlobalErrorLoggerProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } as GlobalErrorLoggerProps
// }
