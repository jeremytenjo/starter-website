// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type TextFieldProps } from '@useweb/ui/TextField'
import colors from '../../../../../../theme/tokens/colors'

const defaults: ComponentDefaultsProps<TextFieldProps> = {
  styleOverrides: {
    root: {
      '& .useweb_TextField_label': {
        color: colors.black.main,
        fontWeight: 500,
        fontSize: '13px',
      },
    },
  },
}

export default defaults
