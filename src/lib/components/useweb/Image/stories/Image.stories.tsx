//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import PixelPerfect from '@useweb/pixel-perfect'

import Image, { type ImageProps } from '../Image'

import Docs from './Image.docs'

const defaultArgs: ImageProps = {
  src: 'https://replicate.delivery/pbxt/Co9G6iJQKWqiI5BG8rc7G0bcQsiHK9uOr1Ng9UHwFzk7399D/out-0.png',
  width: 400,
  height: 400,
  alt: 'alt',
  // set to true to render in storybook
  unoptimized: true,
}

export default {
  title: 'lib/components/useweb/Image',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: typeof defaultArgs) => {
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
      <Image {...args} alt='asd' />
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: ImageProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
