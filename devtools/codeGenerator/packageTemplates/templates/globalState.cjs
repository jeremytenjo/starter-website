const generateUseVariable = require('../utils/generateUseVariable.cjs')

const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name }) => {
      const shortName = generateUseVariable(`${name}`)

      return `import create from 'zustand'

      type ${name}Props = {
  ${shortName}: any
  set${shortName}: (props: any) => any
}

    export const ${name}Store = create<${name}Props>((set) => ({
      ${shortName}: true,
      set${shortName}: (newValue) => set(() => ({ ${shortName}: newValue })),
    }))

    export default function ${name}() {
      const ${shortName}Store = ${name}Store()

      const update${shortName} = (newValue) => {
        ${shortName}Store.set${shortName}(newValue)
      }

      return {
        ${shortName}: ${shortName}Store.${shortName},
        update${shortName}
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
