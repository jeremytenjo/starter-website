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
  color: colors.white.main,
  backgroundColor: colors.error.main,
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.error.main,
  },
}
const whiteVariantStyles = {
  color: colors.black.main,
  backgroundColor: colors.white.main,
  border: '1px solid transparent',
  borderColor: colors.grey.med,
  '&:hover, &:active, &:focus': {
    boxShadow: 'none',
    backgroundColor: colors.white.main,
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
      fontWeight: '600',
      boxShadow: 'none',
      width: '100%',
      color: 'white',
      textTransform: 'none' as const,
      '&.Mui-disabled': {
        color: 'lightgrey',
      },
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

    // white
    {
      props: {
        variant: 'white',
      },
      style: {
        ...whiteVariantStyles,
      },
    },
    {
      props: {
        variant: 'white',
        size: 'small',
      },
      style: {
        ...whiteVariantStyles,
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
    white: true
  }
}

export default defaults
