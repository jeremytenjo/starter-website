const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${namePascalCase}Props`
      return `import React from 'react'       
    import Box from '@mui/material/Box'
  
    export type ${propsName} = { name: string }
  
    export default function ${namePascalCase}({ name }: ${propsName}) {
      return (
        <Box>
         ${name}
        </Box>
      );
    }
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
