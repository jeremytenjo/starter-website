//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import ContactForm, { type ContactFormProps } from '../ContactForm'

import Docs from './ContactForm.docs'

const defaultArgs: ContactFormProps = {
  name: 'ContactForm',
}

export default {
  title: 'lib/components/ContactForm',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ContactFormProps) => {
  return (
    <>
      <ContactForm {...args} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ContactFormProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
