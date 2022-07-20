const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name }) => {
      return `${name}.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')

      return `
      import React from 'react'

    ${slots?.childContainers?.importStatements || ''}


export default function ${pascalName}Content() {
  return (
    <div>
    ${slots?.childContainers?.importedComponents || pascalName}
    </div>
  )
}
`
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')
      const filesName = `use${pascalName}Props`
      return `${filesName}/${filesName}.tsx`
    },
    template: ({ name, helpers }) => {
      const removeUse = name.replace('use', '')
      const upperName = helpers.changeCase.pascalCase(removeUse).replaceAll(' ', '')
      const propsName = `${upperName}Props`
      const pageName = helpers.changeCase.paramCase(name).split(' ').join('')

      return `import React, { createContext, useContext } from 'react'

      import type { ${propsName} } from '../../../pages/${pageName}'
     
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
