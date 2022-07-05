// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'

const defaults: ComponentDefaultsProps = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        color: 'white',
      },
      '& .MuiDialog-scrollPaper': {
        background: 'rgb(255 255 255 / 33%)',
        backdropFilter: 'blur(7px) saturate(150%)',
      },
    },
  },
}

export default defaults
