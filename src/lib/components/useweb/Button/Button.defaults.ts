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
const blackVariantStyles = {
  color: colors.white.main,
  backgroundColor: colors.black.main,
  '&:hover, &:focus, &:active': {
    backgroundColor: colors.black.main,
  },
}
const severeVariantStyles = {
  color: colors.error.main,
  backgroundColor: 'transparent',
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}

const variantSmallStyles = {
  fontSize: '0.8125rem',
}

const outlinedBase = {
  color: colors.primary.dark,
  border: '2px solid transparent',
  borderColor: colors.primary.dark,
  '&:hover': {
    border: '2px solid transparent',
    borderColor: colors.primary.dark,
    backgroundColor: colors.primary.light,
  },
}
const outlinedSmall = {
  height: '35px',
}

const defaults: ComponentDefaultsProps<ButtonProps> = {
  defaultProps: {
    variant: 'contained',
    name: 'default name',
    size: 'small',
  },
  styleOverrides: {
    root: {
      borderRadius: '6px',
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
    // Outlined
    {
      props: {
        variant: 'outlined',
      },
      style: {
        ...outlinedBase,
      },
    },
    {
      props: {
        variant: 'outlined',
        size: 'small',
      },
      style: {
        ...outlinedBase,
        ...outlinedSmall,
      },
    },

    // Black
    {
      props: {
        variant: 'black',
      },
      style: {
        ...blackVariantStyles,
      },
    },
    {
      props: {
        variant: 'black',
        size: 'small',
      },
      style: {
        ...blackVariantStyles,
        ...variantSmallStyles,
      },
    },

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

    // Severe
    {
      props: {
        variant: 'severe',
      },
      style: {
        ...severeVariantStyles,
      },
    },
    {
      props: {
        variant: 'severe',
        size: 'small',
      },
      style: {
        ...severeVariantStyles,
        ...variantSmallStyles,
      },
    },
  ],
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    light: true
    severe: true
    black: true
  }
}

export default defaults
