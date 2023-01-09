const generateUseVariable = require('../utils/generateUseVariable.cjs')

const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name }) => {
      const shortName = generateUseVariable(`${name}`)

      return `import create from 'zustand'

      type ${name}Props = {
  example: any
  setExample: (props: any) => any
}

    const ${name}Store = create((set) => ({
      example: true,
      setExample: (newValue) => set(() => ({ ${shortName}: newValue })),
    }))

    export default function ${name}() {
      const ${shortName}Store = ${name}Store()

      const updateExample = (newValue) => {
        ${shortName}Store.setExample(newValue)
      }

      return {
        ${shortName}: ${shortName}Store.${shortName},
        updateExample
      }
    }`
    },
  },
]

const template = {
  type: 'Global State',
  files,
}

module.exports = {
  files,
  template,
}
