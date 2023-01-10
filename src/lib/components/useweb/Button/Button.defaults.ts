// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ButtonProps } from '@useweb/ui/Button'

const defaults: ComponentDefaultsProps<ButtonProps> = {
  defaultProps: {
    variant: 'contained',
    name: 'default name',
  },
  styleOverrides: {
    root: {
      borderRadius: '10px',
      fontWeight: 'bold',
      boxShadow: 'none',
      width: '100%',
      color: 'white',
      textTransform: 'none' as const,
      '&:hover, &:active, &:focus': {
        boxShadow: 'none',
        backgroundColor: 'primary.main',
      },
    },
  },
}

export default defaults
