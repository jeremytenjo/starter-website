const files = [
  {
    path: ({ name }) => `${name}.defaults.ts`,
    template: () => {
      return `// https://mui.com/customization/theme-components/#global-style-overrides
      // import in src/theme/useweb/UsewebThemeProvider.jsx
      import { type ComponentDefaultsProps } from '@useweb/theme'

      const defaults: ComponentDefaultsProps = {
        styleOverrides: {
          root: {
            backgroundColor: 'red',
          },
        },
      }
      
      export default defaults`
    },
  },
]

const template = {
  type: 'Component Defaults',
  files,
}

module.exports = {
  files,
  template,
}
