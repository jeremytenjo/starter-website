// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type DialogProps } from '@useweb/ui/Dialog'

const defaults: ComponentDefaultsProps<DialogProps> = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        boxShadow: '0px 9px 38px rgba(0, 0, 0, 0.06)',
        borderRadius: '20px',
      },
      '& .MuiDialog-scrollPaper': {
        background: 'rgb(255 255 255 / 33%)',
        backdropFilter: 'blur(7px) saturate(150%)',
      },
    },
  },
}

export default defaults
