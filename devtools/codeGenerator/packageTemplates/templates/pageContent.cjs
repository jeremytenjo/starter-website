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
      const removeUse = name.replace('use', '')
      const upperName = helpers.changeCase.capitalCase(removeUse).split(' ').join('')
      const propsName = `${upperName}Props`

      return `import React, { createContext, useContext } from 'react'

      import type { ${propsName} } from 'pagepath'
     
      export const ${upperName}Context = createContext<${propsName}>(null as any)
      
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
