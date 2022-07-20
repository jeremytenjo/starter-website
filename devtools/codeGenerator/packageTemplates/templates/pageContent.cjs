const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return `${pascalName}.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')

      return `
      import React from 'react'
      import Box from '@useweb/ui/Box'

    ${slots?.childContainers?.importStatements || ''}


export default function ${pascalName}Content() {
  return (
    <Wrapper>
    ${slots?.childContainers?.importedComponents || pascalName}
    </Wrapper>
  )
}

  const Wrapper = ({ children }) => {
    return <Box data-id='${name}' sx={{}}>{children}</Box>
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
