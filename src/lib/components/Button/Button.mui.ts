// https://mui.com/customization/theme-components/#adding-new-component-variants
export default {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        fontWeight: 'bold',
        width: '100%',
        textTransform: 'none' as const,
      },
    },
  },
}
