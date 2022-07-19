//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContactUsButton, { type ContactUsButtonProps } from '../ContactUsButton'

import Docs from './ContactUsButton.docs'

const defaultArgs: ContactUsButtonProps = {
  name: 'ContactUsButton',
}

export default {
  title: 'lib/components/ContactUsButton',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ContactUsButtonProps) => {
  return (
    <>
      <ContactUsButton {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContactUsButtonProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
