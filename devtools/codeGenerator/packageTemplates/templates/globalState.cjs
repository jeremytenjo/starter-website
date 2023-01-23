const files = [
  {
    path: ({ name, helpers }) => {
      const upperName = helpers.changeCase.pascalCase(name)

      return `use${upperName}Store.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers.changeCase.camelCase(name)
      const upperName = helpers.changeCase.pascalCase(name)

      return `import create from 'zustand'

      type ${upperName}Props = {
  ${camelCase}: any
  set${upperName}: (props: any) => any
}

    export const ${camelCase}Store = create<${upperName}Props>((set) => ({
      ${camelCase}: true,
      set${upperName}: (newValue) => set(() => {
        return { ${camelCase}: newValue }
    }),
    }))

    export default function use${upperName}Store() {
      const store = ${camelCase}Store()

      const update${upperName} = (newValue) => {
        store.set${upperName}(newValue)
      }

      return {
        ${camelCase}: store.${camelCase},
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
