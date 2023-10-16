const files = [
  {
    path: ({ name }) => `${name}Schema/${name}.schema.tsx`,
    template: ({ name }) => {
      return `export type ${name}Schema = any`
    },
  },
  {
    path: ({ name }) => {
      const stubsName = `${name}Schema/${lowerCaseFirst(name)}.stubs.tsx`

      return stubsName
    },
    template: ({ name }) => {
      const nameLowerCaseFirst = lowerCaseFirst(name)
      const stubName = `${nameLowerCaseFirst}Stubs`

      return `import type { ${name}Schema } from './${name}.schema'

      const ${stubName}: ${name}Schema[] = []
      
      export default ${stubName}
      
      `
    },
  },
]

const template = {
  type: 'TS Schema',
  files,
  options: {
    createNamedFolder: false,
  },
}

module.exports = {
  files,
  template,
}

function lowerCaseFirst(s) {
  return s[0].toLowerCase() + s.slice(1)
}
