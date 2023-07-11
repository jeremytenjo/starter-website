// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
// https://vitest.dev/api/
const testFile = {
  path: ({ name, helpers }) => `${helpers.changeCase.camelCase(name)}.vitest.ts`,
  template: ({ name }) => {
    return `// https://vitest.dev/api/
    import { expect, test } from 'vitest'
    import ${name} from '../${name}'

  
    test('Success', async () => {
      const result = ${name}({})

      const expected: ReturnType<typeof ${name}> = {}
    
      expect(result).toStrictEqual(expected)
    })
    
    `
  },
}

const files = [testFile]

const template = {
  type: 'Vitest unit test',
  files,
}

module.exports = {
  files,
  template,
  testFile,
}
