const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name)

      return `import create from 'zustand'

      type ${upperName}Props = {
  ${name}: any
  set${upperName}: (props: any) => any
}

    export const ${upperName}Store = create<${upperName}Props>((set) => ({
      ${name}: true,
      set${upperName}: (newValue) => set(() => ({ ${name}: newValue })),
    }))

    export default function use${upperName}() {
      const ${upperName}Store = ${upperName}Store()

      const update${upperName} = (newValue) => {
        ${upperName}Store.set${upperName}(newValue)
      }

      return {
        ${name}: ${upperName}Store.${name},
        update${upperName}
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
