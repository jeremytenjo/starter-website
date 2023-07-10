// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
// https://vitest.dev/api/
const files = [
  {
    path: ({ name }) => `${name}.vitest.ts`,
    template: ({ name }) => {
      return `// https://vitest.dev/api/
      import { expect, test } from 'vitest'
      import ${name} from '../${name}'

    
      test('Success', async () => {
        const result = ${name}({})

        const expected: ReturnType<typeof ${name} = {}
      
        expect(result).toStrictEqual(expected)
      })
      
      `
    },
  },
]

const template = {
  type: 'Vitest unit test',
  files,
}

module.exports = {
  files,
  template,
}
