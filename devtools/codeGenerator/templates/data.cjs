const files = [
  {
    path: ({ name }) => `${name}.schema.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      type ${upperName}Schema = {
        id: string
      }
      
      export default ${upperName}Schema

      `
    },
  },
  {
    path: ({ name }) => `${name}.stubs.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      import type ${upperName}Schema from './${name}.schema'

      const ${upperName}Stubs: ${upperName}Schema[] = []
      
      export default ${upperName}Stubs

      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      return `${name}.api/get${upperName}.tsx`
    },
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      import ${name}Stubs from '../${name}.stubs'
      import type ${upperName}Schema from '../${name}.schema'
      
      export default async function get${upperName}() {
        const isDev = process.env.NODE_ENV === 'development'
        const ${name}: ${upperName}Schema[] = isDev
          ? ${name}Stubs
          : await get${upperName}FromApi()
      
        return ${name}
      }
      
      const get${upperName}FromApi = () => {
        const ${name}: ${upperName}Schema[] = []
        // TODO get ${name} from api
      
        return ${name}
      }
      

      `
    },
  },
]

const template = {
  type: 'Data',
  files,
}

module.exports = {
  files,
  template,
}
