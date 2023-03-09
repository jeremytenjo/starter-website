const story = require('./story.cjs')

const files = [
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `stories/${pascalCase}.stories.tsx`
    },
    template: ({ name, helpers, folderPath, slots = {} }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return story.getStoryTemplate({
        name: `${name}`,
        type: 'component',
        helpers,
        folderPath,
        importOverride: `import ${pascalCase}, { type ${pascalCase}Props } from '../${pascalCase}'
        ${slots?.importOverride ? slots?.importOverride : ''}`,
        storiesDefaultArgs: slots.storiesDefaultArgs,
      })
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `use${pascalCase}Data/use${pascalCase}Data.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const pascalCase = `${helpers.changeCase.pascalCase(name)}Data`

      return `import React, { createContext, useContext } from 'react'

      ${slots?.useDataImports || ''}

      export type ${pascalCase}Props = ${slots?.useDataTypeImportName || 'any'}
      
      export type ${pascalCase}Return = ${pascalCase}Props
      
      export const ${pascalCase}Context = createContext<${pascalCase}Return>(undefined as any)

      type ${pascalCase}ProviderProps = {
        children: any
        props: ${pascalCase}Props
      }
      
      export const ${pascalCase}Provider = (props: ${pascalCase}ProviderProps) => {
        const data: ${pascalCase}Return = {
          ...props.props,
        }
      
        return (
          <${pascalCase}Context.Provider value={data}>{props.children}</${pascalCase}Context.Provider>
        )
      }
      
      const use${pascalCase} = () => useContext(${pascalCase}Context)
      
      export default use${pascalCase}
      
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `${pascalCase}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import { ${pascalCase}DataProvider, type ${pascalCase}DataProps } from './use${pascalCase}Data/use${pascalCase}Data'

      export type ${pascalCase}Props = ${pascalCase}DataProps
      
      export default function ${pascalCase}(props: ${pascalCase}Props) {
        return (
          <${pascalCase}DataProvider props={props}>
            <Wrapper>
              <Text text={'${pascalCase}'} tag='p' sx={{}} />
            </Wrapper>
          </${pascalCase}DataProvider>
        )
      }

      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalCase}' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },
  // story.docsTemplate(),
]

const template = {
  type: 'Component With Provider',
  files,
}

module.exports = {
  files,
  template,
}
