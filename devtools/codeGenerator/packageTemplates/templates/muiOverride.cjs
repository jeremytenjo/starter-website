const files = [
  {
    path: ({ name }) => `${name}.defaults.ts`,
    template: ({ name }) => {
      return `// https://mui.com/customization/theme-components/#global-style-overrides
      // import in src/theme/useweb/UsewebThemeProvider.jsx
      import { type ComponentDefaultsProps } from '@useweb/ui-theme'
      import { type ${name}Props } from '@useweb/ui/${name}'

      const defaults: ComponentDefaultsProps<${name}Props> = {
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
