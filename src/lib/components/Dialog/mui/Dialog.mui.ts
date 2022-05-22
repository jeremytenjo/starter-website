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
          background: 'rgb(255 255 255 / 33%)',
          backdropFilter: 'blur(7px) saturate(150%)',
        },
      },
    },
  },
}
