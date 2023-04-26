// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type SelectProps } from '@useweb/ui/Select'
import colors from '../../../../../../theme/tokens/colors'

const defaults: ComponentDefaultsProps<SelectProps> = {
  styleOverrides: {
    root: {
      borderRadius: '6px',
      borderColor: colors.grey.med,
      borderWidth: '1px',
      borderStyle: 'solid',
      backgroundColor: colors.white.main,
      '& .MuiSelect-select': {
        padding: '10px',
        paddingLeft: '15px',
        paddingRight: '15px',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
}

export default defaults
