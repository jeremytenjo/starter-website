const story = require('./story.cjs')

const files = [
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers, folderPath, slots = {} }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return story.getStoryTemplate({
        name: `${name}`,
        type: 'component',
        helpers,
        folderPath,
        importOverride: `import { type ${namePascalCase}DataProps as ${namePascalCase}Props } from '../use${namePascalCase}Data/use${namePascalCase}Data'
        import ${namePascalCase} from '../${namePascalCase}'
        ${slots?.importOverride ? slots?.importOverride : ''}`,
        storiesDefaultArgs: slots.storiesDefaultArgs,
      })
    },
  },
  {
    path: ({ name }) => `use${name}Data/use${name}Data.tsx`,
    template: ({ name, helpers, slots = {} }) => {
      const namePascalCase = `${helpers.changeCase.pascalCase(name)}Data`

      return `import React, { createContext, useContext } from 'react'

      ${slots?.useDataImports || ''}

      export type ${namePascalCase}Props = ${slots?.useDataTypeImportName || 'any'}
      
      export type ${namePascalCase}Return = ${namePascalCase}Props
      
      export const ${namePascalCase}Context = createContext<${namePascalCase}Return>(undefined as any)

      type ${namePascalCase}ProviderProps = {
        children: any
        props: ${namePascalCase}Props
      }
      
      export const ${namePascalCase}Provider = (props: ${namePascalCase}ProviderProps) => {
        const data: ${namePascalCase}Return = {
          ...props.props,
        }
      
        return (
          <${namePascalCase}Context.Provider value={data}>{props.children}</${namePascalCase}Context.Provider>
        )
      }
      
      const use${namePascalCase} = () => useContext(${namePascalCase}Context)
      
      export default use${namePascalCase}
      
      `
    },
  },
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import React from 'react'

      import { ${namePascalCase}DataProvider } from './use${namePascalCase}Data/use${namePascalCase}Data'
      import ${namePascalCase}Ui from './ui/${namePascalCase}Ui'
      import { type ${namePascalCase}DataProps } from './use${namePascalCase}Data/use${namePascalCase}Data'
      
      export default function ${namePascalCase}(props: ${namePascalCase}DataProps) {
        return (
          <${namePascalCase}DataProvider props={props}>
            <${namePascalCase}Ui />
          </${namePascalCase}DataProvider>
        )
      }
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      return `ui/${namePascalCase}Ui.tsx`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      
      export default function ${namePascalCase}Ui() {
        return (
          <Wrapper>
            ${name}
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${namePascalCase}' sx={{}}>
            {children}
          </Box>
        )
      }
      
      `
    },
  },
  story.docsTemplate(),
]

const template = {
  type: 'Component With Provider',
  files,
}

module.exports = {
  files,
  template,
}