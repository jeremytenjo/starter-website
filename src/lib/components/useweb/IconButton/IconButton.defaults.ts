// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/theme'

const defaults: ComponentDefaultsProps = {
  styleOverrides: {
    root: {
      width: '40px',
      height: '40px',
      border: '0.985222px solid #E6E6E6',
      borderRadius: '9.85222px',
      backgroundColor: 'white',
      ':hover': {
        backgroundColor: 'white',
      },
    },
  },
}

export default defaults
