import React from 'react'
import { create } from '@storybook/theming'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import * as NextImage from 'next/image'

import ClickToComponent from '../../src/lib/components/useweb/ClickToComponent/ClickToComponent'
import Prismic from '../../src/lib/components/integrations/Prismic/Prismic'

import StorybookTheme from './theme/storybookTheme'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

const theme = create({
  base: 'light',
  brandUrl: 'https://github.com/jeremytenjo/starter-webapp',
})

export const decorators = [
  (Story) => {
    return (
      <>
        <ClickToComponent />

        <Prismic>
          <SnackbarProvider>
            <StorybookTheme>
              <Story />
            </StorybookTheme>
          </SnackbarProvider>
        </Prismic>
      </>
    )
  },
]

const isProd = process.env.NODE_ENV === 'production'

export const parameters = {
  docs: {
    theme,
  },
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: isProd ? -1 : 1 },
  },
}
