// https://mui.com/customization/theme-components/#adding-new-component-variants
// import in src/theme/mui/MuiProvider.jsx
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
