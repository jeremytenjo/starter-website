import React from 'react'
import { ThemeProvider, createTheme, type CreateThemeProps } from '@useweb/theme'

import colors from '../tokens/colors'
import { variants as typography } from '../tokens/typography/typography'
import Button from '../../lib/components/useweb/Button/Button.defaults'
import IconButton from '../../lib/components/useweb/IconButton/IconButton.defaults'
import Dialog from '../../lib/components/useweb/Dialog/Dialog.defaults'
import Alert from '../../lib/components/useweb/Alert/Alert.defaults'

import CssBaseline from './CssBaseline/CssBaseline.defaults'

const themeData: CreateThemeProps = {
  palette: colors,
  typography,
  // https://mui.com/customization/theme-components/#global-style-overrides
  components: {
    CssBaseline,
    Button,
    Dialog,
    IconButton,
    Alert,
  },
}

export const theme = createTheme(themeData)

export default function UsewebThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
