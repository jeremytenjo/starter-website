// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
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
      textTransform: 'none' as const,
      fontFamily: 'PublicSansRegular',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
    },
  },
}

export default defaults
