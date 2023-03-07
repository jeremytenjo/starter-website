//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import RichText, { type RichTextProps } from '../RichText'

const defaultArgs: RichTextProps = {
  field: [
    {
      type: 'heading1',
      text: 'Top Pet Products on Amazon 2022',
      spans: [],
    },
    {
      type: 'paragraph',
      text: '',
      spans: [],
    },
    {
      type: 'image',
      url: 'https://images.prismic.io/amazonsuperaffiliate/7fbfc382-25bf-4f3f-8eac-42cf7929355b_rio.png?auto=compress,format',
      alt: null,
      copyright: null,
      dimensions: {
        width: 768,
        height: 696,
      },
    },
    {
      type: 'heading2',
      text: 'Dog Probiotics',
      spans: [
        {
          start: 0,
          end: 14,
          type: 'strong',
        },
      ],
    },
    {
      type: 'paragraph',
      text: '',
      spans: [],
    },
    {
      type: 'paragraph',
      text: 'These flavoured soft chews are grain-free and contain five strains of probiotics known to support digestive health in dogs. The chewable probiotics for dogs help maintain proper gut flora, support digestive function, and supports a healthy immune system. The probiotic and prebiotic strains helps support normal digestive function and maintain proper gut flora. Perfect for dogs of all sizes and breeds. Using this probiotic for dogs daily can help maintain a healthy GI tract, assist in the digestion and absorption of essential nutrients, and help keep your pup in peak condition',
      spans: [],
    },
    {
      type: 'paragraph',
      text: 'Buy',
      spans: [
        {
          start: 0,
          end: 3,
          type: 'strong',
        },
        {
          start: 0,
          end: 3,
          type: 'hyperlink',
          data: {
            link_type: 'Web',
            url: 'https://www.onlyfindz.com/products/dog-probiotics',
            target: '_blank',
          },
        },
      ],
    },
  ],
}

export default {
  title: 'lib/integrations/prismic/components/RichText',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args: RichTextProps) => {
  return (
    <>
      <RichText {...args} field={args.field} />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: RichTextProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
