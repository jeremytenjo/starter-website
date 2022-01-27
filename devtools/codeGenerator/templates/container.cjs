const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name }) => `import React from 'react'
    
    import ${name}Ui from './${name}Ui/${name}.ui'

    type Props = { 
      loading: boolean 
      empty: boolean 
    }
    
    export default function ${name}() {        
      return <${name}Ui />
    }`,
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name }) => `import React from 'react'
    import Box from '@mui/material/Box'

    export default function ${name}Ui() {        
      return (
        <Box>
          hello
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
