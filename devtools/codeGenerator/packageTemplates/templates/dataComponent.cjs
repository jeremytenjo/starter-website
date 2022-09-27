const story = require('./story.cjs')

const files = [
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers, folderPath }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return story.getStoryTemplate({
        name: `${name}`,
        type: 'component',
        helpers,
        folderPath,
        importOverride: `import { type ${namePascalCase}DataProps as ${namePascalCase}Props } from '../use${namePascalCase}Data/use${namePascalCase}Data'
        import ${namePascalCase} from '../${namePascalCase}'`,
      })
    },
  },
  {
    path: ({ name }) => `use${name}Data/use${name}Data.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = `${helpers.changeCase.pascalCase(name)}Data`

      return `import React, { createContext, useContext } from 'react'

      export type ${namePascalCase}Props = any
      
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
      import { type ${namePascalCase}Props } from './use${namePascalCase}/use${namePascalCase}'
      
      export default function ${namePascalCase}(props: ${namePascalCase}Props) {
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
    path: ({ name }) => `ui/${name}Ui.tsx`,
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
  type: 'Data Component',
  files,
}

module.exports = {
  files,
  template,
}
