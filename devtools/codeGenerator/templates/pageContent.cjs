const files = [
  {
    path: ({ name }) => {
      return `${name}.tsx`
    },
    template: ({ name }) => {
      return `
      import React from 'react'

export default function ${name}Content() {
  return (
    <div>
    ${name}
    </div>
  )
}
`
    },
  },
  {
    path: ({ name }) => {
      const filesName = `use${name}Props`
      return `${filesName}/${filesName}.tsx`
    },
    template: ({ name, helpers }) => {
      const propsName = `${name}Props`
      const removeUse = propsName.replace('use', '')
      const upperName = helpers.changeCase.capitalCase(removeUse).split(' ').join('')
      const typesName = `${upperName}Types`

      return `import React, { createContext, useContext } from 'react'

      export type ${typesName} = {
        items: any[]
      }
      
      export const ${upperName}Context = createContext<${typesName}>(null as any)
      
      export const ${upperName}Provider = ({ children, pageProps }) => {
        return (
          <${upperName}Context.Provider
            value={{
              ...pageProps,
            }}
          >
            {children}
          </${upperName}Context.Provider>
        )
      }
      
      const use${removeUse} = () => useContext(${upperName}Context)
      
      export default use${removeUse}
      
      `
    },
  },
]

const template = {
  type: 'Page Content',
  files,
}

module.exports = {
  files,
  template,
}
