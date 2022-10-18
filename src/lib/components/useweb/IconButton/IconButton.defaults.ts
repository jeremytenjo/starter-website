// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type IconButtonProps } from '@useweb/ui/IconButton'

const defaults: ComponentDefaultsProps<IconButtonProps> = {
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
