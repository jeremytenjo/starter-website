const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `import React from 'react'
    
    import ${name}Ui from './${name}Ui/${name}.ui'

    type ${propsName} = { 
      title: string 
    }
    
    export default function ${name}() {
      const title = 'prop'  

      return <${name}Ui title={title} />
    }`
    },
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name, helpers }) => {
      const propsName = `${helpers.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}UiProps`

      return `import React from 'react'
    import Box from '@mui/material/Box'

    import Text from '@/lib/components/Text/Text'

    export type ${propsName} = {
      title: string
    }

    export default function ${name}Ui({ title }: ${propsName}) {        
      return (
        <Wrapper>
          <Text text={title} />
        </Wrapper>
      )
    }
    
    const Wrapper = ({ children }) => {
      return <Box data-id='${name}'>{children}</Box>
    }
    `
    },
  },
]

const template = {
  type: 'Component - Container',
  files,
}

module.exports = {
  files,
  template,
}
