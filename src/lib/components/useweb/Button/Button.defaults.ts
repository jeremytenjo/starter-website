// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/UiTheme/UiTheme.jsx
import { type ComponentDefaultsProps } from '@useweb/ui-theme'
import { type ButtonProps } from '@useweb/ui/Button'
import colors from '../../../../theme/tokens/colors'

const lightVariantStyles = {
  color: colors.primary.dark,
  backgroundColor: colors.primary.light,
  '&:hover, &:focus, &:active': {
    backgroundColor: colors.primary.light,
  },
}

const variantSmallStyles = {
  fontSize: '0.8125rem',
}

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
      color: 'white',
      textTransform: 'none' as const,
      '&:hover, &:active, &:focus': {
        boxShadow: 'none',
        backgroundColor: 'primary.main',
      },
    },
  },
  variants: [
    // Light
    {
      props: {
        variant: 'light',
      },
      style: {
        ...lightVariantStyles,
      },
    },
    {
      props: {
        variant: 'light',
        size: 'small',
      },
      style: {
        ...lightVariantStyles,
        ...variantSmallStyles,
      },
    },
  ],
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    light: true
  }
}

export default defaults
