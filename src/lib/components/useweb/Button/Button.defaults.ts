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
      fontFamily: 'PoppinsRegular',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  },
}

export default defaults
