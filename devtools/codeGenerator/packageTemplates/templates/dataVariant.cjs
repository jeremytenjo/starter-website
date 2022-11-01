const files = [
  {
    path: ({ name }) => {
      const lowerName = lowerCaseFirst(name)

      return `${lowerName}.ts`
    },
    template: ({ name }) => {
      const lowerName = lowerCaseFirst(name)
      const upperName = upperCaseFirst(name)
      const withoutGet = lowerCaseFirst(`${name.replace('get', '').replace('Get', '')}`)

      return `
      export type ${upperName}Props = any
      
      export type ${upperName}Return = any
      
      export default function ${lowerName}(
        props: ${upperName}Props,
      ) {
        const ${withoutGet}: ${upperName}Return = []
      
        return ${withoutGet}
      }
      `
    },
  },
  {
    path: ({ name }) => {
      const lowerName = lowerCaseFirst(name)
      return `${lowerName}.stubs.ts`
    },
    template: ({ name }) => {
      const lowerName = lowerCaseFirst(name)
      const upperName = upperCaseFirst(name)

      return `import { type ${upperName}Return } from './${lowerName}'

      const ${lowerName}Stubs: ${upperName}Return = []
      
      export default ${lowerName}Stubs
      
      `
    },
  },
  {
    path: ({ name }) => {
      const lowerName = lowerCaseFirst(name)
      return `${lowerName}.vitest.ts`
    },
    template: ({ name }) => {
      const lowerName = lowerCaseFirst(name)
      const upperName = upperCaseFirst(name)

      return `// https://vitest.dev/api
      import { expect, test } from 'vitest'
      
      import ${lowerName}, {
        type ${upperName}Props,
        type ${upperName}Return,
      } from './${lowerName}'
      import ${lowerName}Stubs from './${lowerName}.stubs'
      
      const input: ${upperName}Props = {}
      const expectedResult: ${upperName}Return = ${lowerName}Stubs
      
      test('returns NavLinksSortedByCategory', async () => {
        const result: ${upperName}Return = await ${lowerName}(
          input,
        )
      
        expect(result).toEqual(expectedResult)
      })
      
      `
    },
  },
]

const template = {
  type: 'Data Variant',
  files,
}

module.exports = {
  files,
  template,
}

function lowerCaseFirst(s) {
  return s[0].toLowerCase() + s.slice(1)
}
function upperCaseFirst(s) {
  return s[0].toUpperCase() + s.slice(1)
}
