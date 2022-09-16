const story = require('./story.cjs')

const files = [
  {
    path: ({ name }) => `use${name}/use${name}.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return `import React, { createContext, useContext } from 'react'

      export type ${namePascalCase}Props = any
      
      export type ${namePascalCase}Return = ${namePascalCase}Props
      
      export const ${namePascalCase}Context = createContext<${namePascalCase}Return>(undefined as any)

      type ${namePascalCase}ProviderProps = {
        children: any
        props: ${namePascalCase}Props
      }
      
      export const ${namePascalCase}Provider = (props: ${namePascalCase}ProviderProps) => {
        const localData: ${namePascalCase}Return = {}

        const data: ${namePascalCase}Return = {
          ...localData,
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

      import { ${namePascalCase}Provider } from './use${namePascalCase}/use${namePascalCase}'
      import ${namePascalCase}Ui from './ui/${namePascalCase}Ui'
      import { type ${namePascalCase}Props } from './use${namePascalCase}/use${namePascalCase}'
      
      export default function ${namePascalCase}(props: ${namePascalCase}Props) {
        return (
          <${namePascalCase}Provider props={props}>
            <${namePascalCase}Ui />
          </${namePascalCase}Provider>
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
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers, folderPath }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)

      return story.getStoryTemplate({
        name,
        type: 'component',
        helpers,
        folderPath,
        importOverride: `import { type ${namePascalCase}Props } from '../use${namePascalCase}/use${namePascalCase}'
        import ${namePascalCase} from '../${namePascalCase}'`,
      })
    },
  },
]

const template = {
  type: 'Data Component',
  files,
}

module.exports = {
  files,
  template,
}
