const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return `pages/${pascalName}.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')

      return `
      import React from 'react'
      import Box from '@useweb/ui/Box'

    ${slots?.childContainers?.importStatements || ''}


export default function ${pascalName}Page() {
  return (
    <Box data-id='${name}' sx={{}}>
    ${slots?.childContainers?.importedComponents || pascalName}
    </Box>
  )
}

`
    },
  },
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      const componentName = `${pascalName}PageLayout`

      return `layouts/${componentName}/${componentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}PageLayout`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      
      export type ${componentName}Props = { children: any }
      
      export default function ${componentName}(props: ${componentName}Props) {
        return (
          <Box data-id='${componentName}' sx={{}}>
            <Text text={'${componentName}'} tag='p' sx={{}} />
            {props.children}
          </Box>
        )
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
