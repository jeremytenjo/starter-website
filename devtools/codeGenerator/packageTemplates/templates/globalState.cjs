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
  saving: any
  setsaving: (props: any) => any
}

export const ${camelCase}Store = create<${upperName}Props>((set) => ({
  saving: undefined,
  setsaving: (payload) =>
    set(() => {
      return { saving: payload }
    })
}))

const use${upperName}Store = ${camelCase}Store

export default use${upperName}Store
`
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
