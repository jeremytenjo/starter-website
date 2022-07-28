// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

const defaults: ComponentDefaultsProps = {
  styleOverrides: {
    root: {
      width: '40px',
      height: '40px',
      ':hover': {
        backgroundColor: 'white',
      },
    },
  },
}

export default defaults
