// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

const defaults: ComponentDefaultsProps = {
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
