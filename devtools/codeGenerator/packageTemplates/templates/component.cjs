const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers, slots = {} }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${namePascalCase}Props`
      return `import React from 'react'       
    import Box from '@useweb/ui/Box'

    export type ${propsName} = { name: string }
  
    export default function ${namePascalCase}({ name = '${name}' }: ${propsName}) {
      return (
        <Wrapper>
          {name}
          ${slots?.localComponents?.localComponentsDeclarations || ''}
        </Wrapper>
      );
    }

    const Wrapper = ({ children }) => {
      return <Box data-id='${name}' sx={{}}>{children}</Box>
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
