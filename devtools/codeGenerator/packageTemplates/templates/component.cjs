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
      const camelCase = helpers.changeCase.camelCase(name)
      const isFunctionWithComponent = type === 'Function with Component'
      const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
      const componentName = `${pascalCase}${componentNameAffix}`
      const propsName = `${componentName}Props`

      return `import React from 'react'       
    import Box from '@useweb/ui/Box'

    ${
      isFunctionWithComponent
        ? `import use${pascalCase} from '../use${pascalCase}/use${pascalCase}'`
        : ''
    }

    export type ${propsName} = { name?: string }
  
    export default function ${componentName}(props: ${propsName}) {
      ${
        isFunctionWithComponent
          ? `const ${camelCase} = use${pascalCase}()
console.log(${camelCase})`
          : ''
      }
      return (
        <Wrapper>
          ${componentName}
          ${slots?.localComponents?.localComponentsDeclarations || ''}
        </Wrapper>
      );
    }

    const Wrapper = ({ children }) => {
      return <Box data-id='${componentName}' sx={{}}>{children}</Box>
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
