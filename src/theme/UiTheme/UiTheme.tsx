import React from 'react'
import MuiCssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme, type CreateThemeProps } from '@useweb/ui-theme'

import colors from '../tokens/colors'
import { variants as typography } from '../tokens/typography/typography'
import Button from '../../lib/components/useweb/Button/Button.defaults'
import IconButton from '../../lib/components/useweb/IconButton/IconButton.defaults'
import Dialog from '../../lib/components/useweb/Dialog/Dialog.defaults'
import Alert from '../../lib/components/useweb/Alert/Alert.defaults'
import Select from '../../lib/components/useweb/forms/fields/Select/Select.defaults'
import TextField from '../../lib/components/useweb/forms/fields/TextField/TextField.defaults'
import Menu from '../../lib/components/useweb/Menu/Menu.defaults'
import Divider from '../../lib/components/useweb/Divider/Divider.defaults'
import Popover from '../../lib/components/useweb/Popover/Popover.defaults'

import CssBaseline from './CssBaseline/CssBaseline.defaults'

const themeData: CreateThemeProps = {
  palette: colors as any,
  typography,
  // https://mui.com/customization/theme-components/#global-style-overrides
  components: {
    CssBaseline,
    Button,
    Dialog,
    IconButton,
    Alert,
    Select,
    TextField,
    Menu,
    Divider,
    Popover,
  },
}

export const theme = createTheme(themeData)

export default function UiTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiCssBaseline />
      {children}
    </ThemeProvider>
  )
}
