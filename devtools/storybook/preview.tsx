import React from 'react'
import { create } from '@storybook/theming'
import { SnackbarProvider } from '@useweb/ui/Snackbar'
import ClickToComponent from '@useweb/click-to-component'
import Box from '@useweb/ui/Box'

// import Prismic from '../../src/lib/integrations/Prismic/Prismic'
// import Firebase from '../../src/lib/integrations/Google/Firebase/firebase'

import StorybookTheme from './theme/storybookTheme'

const theme = create({
  base: 'light',
  brandUrl: 'https://github.com/jeremytenjo/starter-webiste',
})

export const decorators = [
  (Story) => {
    return (
      <>
        {process.env.NODE_ENV === 'development' && <ClickToComponent />}

        {/* <Prismic disablePreview> */}
        {/* <Firebase> */}
        <SnackbarProvider>
          <StorybookTheme>
            <Box
              sx={{
                minHeight: '100vh',
              }}
            >
              <Story />
            </Box>
          </StorybookTheme>
        </SnackbarProvider>
        {/* </Firebase> */}
        {/* </Prismic> */}
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
  viewport: {
    // https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '360px',
          height: '875px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '600px',
          height: '875px',
        },
      },
      macbookPro16: {
        name: 'Macbook Pro 16',
        styles: {
          width: '1920px',
          height: '900px',
        },
      },
    },
  },
}
