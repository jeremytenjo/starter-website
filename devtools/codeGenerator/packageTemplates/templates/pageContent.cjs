const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return `pages/${pascalName}Page.tsx`
    },
    template: ({ name, helpers, slots = {} }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}Page`

      return `
      import React from 'react'
      import Box from '@useweb/ui/Box'
      
      import ${componentName}Layout from '../layouts/${componentName}Layout/${componentName}Layout.js'

    ${slots?.childContainers?.importStatements || ''}


export default function ${componentName}() {
  return (
    <${componentName}Layout>
      <Box data-id='${componentName}' sx={{}}>
      ${slots?.childContainers?.importedComponents || pascalName}
      </Box>
    </${componentName}Layout>
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
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: () => {
      return `containers/readme.md`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}PageLayout`

      return `## ${componentName} Containers

        Containers are components that are used to pass data to other components. They are used to separate data fetching from the components that use the data.
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
