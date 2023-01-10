// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type PopoverProps } from '@useweb/ui/Popover'

const defaults: ComponentDefaultsProps<PopoverProps> = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        background: '#FFFFFF',
        border: '1px solid #E7E7E7',
        boxShadow: '0px 9px 38px rgba(0, 0, 0, 0.06)',
        borderRadius: '7px',
        filter: 'none',
        '&::before': {
          display: 'none',
        },
      },
    },
  },
}

export default defaults
