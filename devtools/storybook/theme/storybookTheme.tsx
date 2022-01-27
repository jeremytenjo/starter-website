import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

import './storybookTheme.css'
import { muiTheme } from '../../../src/theme/mui/MuiProvider'
import AppTheme from '../../../src/theme/theme'

export default function StorybookTheme({ children }) {
  return (
    // temporary fix for theme in storybook https://github.com/mui-org/material-ui/issues/24282#issuecomment-859393395
    <EmotionThemeProvider theme={muiTheme}>
      <AppTheme>{children}</AppTheme>
    </EmotionThemeProvider>
  )
}
