const files = [
  {
    path: ({ name }) => `mui/${name}.mui.ts`,
    template: ({ name }) => {
      return `// https://mui.com/customization/theme-components/#adding-new-component-variants
      // import in src/theme/mui/MuiProvider.jsx

      export default {
        Mui${name}: {
          styleOverrides: {
            root: {
              backgroundColor: 'red',
            },
          },
        },
      }`
    },
  },
]

const template = {
  type: 'MUI Override',
  files,
}

module.exports = {
  files,
  template,
}
