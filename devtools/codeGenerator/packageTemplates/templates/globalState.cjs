const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const upperName = helpers.changeCase.pascalCase(name)

      return `import create from 'zustand'

      type ${upperName}Props = {
  ${name}: any
  set${upperName}: (props: any) => any
}

    export const ${upperName}Store = create<${upperName}Props>((set) => ({
      ${camelCase}: true,
      set${upperName}: (newValue) => set(() => ({ ${camelCase}: newValue })),
    }))

    export default function use${upperName}() {
      const ${upperName}Store = ${upperName}Store()

      const update${upperName} = (newValue) => {
        ${upperName}Store.set${upperName}(newValue)
      }

      return {
        ${camelCase}: ${upperName}Store.${camelCase},
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
