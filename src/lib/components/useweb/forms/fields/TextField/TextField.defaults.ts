// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TextFieldProps } from '@useweb/ui/TextField'
import colors from '../../../../../../theme/tokens/colors'

const defaults: ComponentDefaultsProps<TextFieldProps<any>> = {
  styleOverrides: {
    root: {
      '& .useweb_TextField_label': {
        color: colors.gray[700],
        fontWeight: 500,
        fontSize: '13px',
      },
    },
  },
}

export default defaults
