// https://mui.com/customization/theme-components/#global-style-overrides
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type AlertProps } from '@useweb/ui/Alert'

const defaults: ComponentDefaultsProps<AlertProps> = {
  styleOverrides: {
    root: {
      backdropFilter: 'blur(12px) saturate(0.9)',
    },
  },
}

export default defaults
