const files = [
  {
    path: ({ name }) => {
      return `${name}.tsx`
    },
    template: ({ name, helpers }) => {
      const removeUse = name.replace('use', '')
      const upperName = helpers.changeCase.capitalCase(removeUse).split(' ').join('')
      const propsName = `${upperName}Types`

      return `import React, { createContext, useContext } from 'react'

      type ${propsName} = {
        title: string
      }
      
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
      
      const ${name} = () => useContext(${upperName}Context)
      
      export default ${name}
      
      `
    },
  },
]

const template = {
  type: 'Page Props Context',
  files,
}

module.exports = {
  files,
  template,
}
