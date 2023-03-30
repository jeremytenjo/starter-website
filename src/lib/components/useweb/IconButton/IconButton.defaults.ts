// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type IconButtonProps } from '@useweb/ui/IconButton'

const defaults: ComponentDefaultsProps<IconButtonProps> = {
  styleOverrides: {
    root: {
      width: '40px',
      height: '40px',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
      },
    },
  },
}

export default defaults
