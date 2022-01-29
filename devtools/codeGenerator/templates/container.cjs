const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name }) => `import React from 'react'
    
    import ${name}Ui from './${name}Ui/${name}.ui'

    export default function ${name}() {        
      return <${name}Ui />
    }`,
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name }) => `import React from 'react'
    import Box from '@mui/material/Box'

    type Props = {
      name: string
    }

    export default function ${name}Ui({name}: Props) {        
      return (
        <Box>
        ${name}
        </Box>
      )
    }`,
  },
]

const template = {
  type: 'Container',
  files,
}

module.exports = {
  files,
  template,
}
