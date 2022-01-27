const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => `import React from 'react'       
    import Box from '@mui/material/Box'
  
    type Props = { name: string }
  
    export default function ${helpers.changeCase.pascalCase(name)}({ name }: Props) {
      return (
        <Box>
         ${name}
        </Box>
      );
    }
      `,
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
