const functionWithComponentName = 'Function with Component'

const files = [
  {
    path: ({ name, helpers, type }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const isFunctionWithComponent = type === functionWithComponentName

      const prefix = isFunctionWithComponent ? 'ui/' : ''
      const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
      const componentName = `${pascalCase}${componentNameAffix}`

      return `${prefix}${componentName}.tsx`
    },
    template: ({ name, helpers, slots = {}, type }) => {
      const pascalCase = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)
      const isFunctionWithComponent = type === functionWithComponentName
      const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
      const componentName = `${pascalCase}${componentNameAffix}`
      const propsName = `${componentName}Props`

      return `import React from 'react'       
    import Box from '@useweb/ui/Box'
    import Text from '@useweb/ui/Text'
${isFunctionWithComponent ? `import ErrorMessage from '@useweb/ui/ErrorMessage'` : ''}
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
          <Text text={'${componentName}'} tag='p' sx={{}} />
          ${isFunctionWithComponent ? `<ErrorMessage error={${camelCase}.error} />` : ''}
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
