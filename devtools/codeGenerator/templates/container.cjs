const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `import React from 'react'
    
    import ${name}Ui from './${name}Ui/${name}.ui'

    type ${propsName} = { 
      name: string 
    }
    
    export default function ${name}({}: ${propsName}) {
      const loading = true 
      const empty = false 
      const error = false  

      return <${name}Ui loading={loading} empty={empty} error={error} />
    }`
    },
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `import React from 'react'
    import Box from '@mui/material/Box'

    type ${propsName} = {
      loading: boolean 
      empty: boolean
      error: Error | boolean
    }

    export default function ${name}Ui({ loading, empty, error }: ${propsName}) {        
      return (
        <Wrapper>
          ${name}
        </Wrapper>
      )
    }
    
    const Wrapper = ({ children }) => {
      return <Box>{children}</Box>
    }
    `
    },
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
