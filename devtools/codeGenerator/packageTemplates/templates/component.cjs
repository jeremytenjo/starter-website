const functionWithComponentName = 'Function with Component'

const files = [
  {
    path: ({ name, helpers, type }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      const prefix = type === functionWithComponentName ? 'ui/' : ''

      return `${prefix}${namePascalCase}.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${namePascalCase}Props`
      return `import React from 'react'       
    import Box from '@useweb/ui/Box'

    export type ${propsName} = { name?: string }
  
    export default function ${namePascalCase}(props: ${propsName}) {
      return (
        <Wrapper>
          ${namePascalCase}
          ${slots?.localComponents?.localComponentsDeclarations || ''}
        </Wrapper>
      );
    }

    const Wrapper = ({ children }) => {
      return <Box data-id='${namePascalCase}' sx={{}}>{children}</Box>
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
