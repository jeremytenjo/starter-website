const functionWithComponentName = 'Function with Component'

const files = [
  {
    path: ({ name, helpers, type }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const prefix = type === functionWithComponentName ? 'ui/' : ''

      return `${prefix}${pascalCase}.tsx`
    },
    template: ({ name, helpers, slots = {}, type }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${pascalCase}Props`
      const camelCase = helpers.changeCase.camelCase(name)
      const isFunctionWithComponent = type === 'Function with Component'

      return `import React from 'react'       
    import Box from '@useweb/ui/Box'

    ${
      isFunctionWithComponent
        ? `import use${pascalCase} from '../use${pascalCase}/use${pascalCase}'`
        : ''
    }

    export type ${propsName} = { name?: string }
  
    export default function ${pascalCase}(props: ${propsName}) {
      ${
        isFunctionWithComponent
          ? `const ${camelCase} = use${pascalCase}()
console.log(${camelCase})`
          : ''
      }
      return (
        <Wrapper>
          ${pascalCase}
          ${slots?.localComponents?.localComponentsDeclarations || ''}
        </Wrapper>
      );
    }

    const Wrapper = ({ children }) => {
      return <Box data-id='${pascalCase}' sx={{}}>{children}</Box>
    }

    ${slots?.localComponents?.localComponents || ''}

      `
    },
  },
]

const template = {
  type: 'Component',
  files,
}

module.exports = {
  files,
  template,
}
