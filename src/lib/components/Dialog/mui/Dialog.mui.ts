// https://mui.com/customization/theme-components/#global-style-overrides
// import in src/theme/mui/MuiProvider.jsx

export default {
  MuiDialog: {
    styleOverrides: {
      root: {
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
          color: 'white',
        },
        '& .MuiDialog-scrollPaper': {
          background: 'rgba(12, 16, 20, 0.33)',
          backdropFilter: 'blur(30px)',
        },
      },
    },
  },
}
