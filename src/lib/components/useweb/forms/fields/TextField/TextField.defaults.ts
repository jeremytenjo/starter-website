// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TextFieldProps } from '@useweb/ui/TextField'
import colors from '../../../../../../theme/tokens/colors'

const defaults: ComponentDefaultsProps<TextFieldProps> = {
  styleOverrides: {
    root: {
      '& .useweb_TextField_label': {
        color: colors.grey.dark,
        fontWeight: 700,
        fontSize: '14px',
      },
    },
  },
}

export default defaults
