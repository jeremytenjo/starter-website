const files = [
  {
    path: ({ name }) => `${name}.schema.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `
      // TODO add ${upperName} schema
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

      const ${upperName}Stubs: ${upperName}Schema[] = [
        // TODO add ${upperName} stubs
      ]
      
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

      import getData from '@/lib/utils/data/getData/getData'
      
      export default async function get${upperName}() {
        const ${name}: ${upperName}Schema[] = await getData({
          stubs: ${name}Stubs,
          getFn: get${upperName}FromApi,
        })
      
        return ${name}
      }
      
      const get${upperName}FromApi = async () => {
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
