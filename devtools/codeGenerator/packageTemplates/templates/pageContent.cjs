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
]

const template = {
  type: 'Page Content',
  files,
}

module.exports = {
  files,
  template,
}
