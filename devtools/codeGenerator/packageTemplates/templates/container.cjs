const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name }) => {
      return `import React from 'react'
    
    import ${name}Ui, { type ${name}UiProps } from './${name}Ui/${name}.ui'
    
    export default function ${name}() {
      const uiProps: ${name}UiProps = {
        title: '${name}'
      }

      return <${name}Ui {...uiProps} />
    }`
    },
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name, helpers, slots = {} }) => {
      const propsName = `${helpers.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}UiProps`

      return `import React from 'react'
    import Box from '@useweb/ui/Box'

    ${slots?.childContainer?.imports || ''}

    export type ${propsName} = {
      title: string
    }

    export default function ${name}Ui(props: ${propsName}) {        
      return (
        <Wrapper>
          <Title {...props} />
          ${slots?.childContainers?.components || ''}
        </Wrapper>
      )
    }
    
    const Wrapper = ({ children }) => {
      return <Box data-id='${name}' sx={{}}>{children}</Box>
    }

    const Title = (props: ${propsName}) => {
      return (
        <Box data-id='Title' sx={{}}>
          {props.title}
        </Box>
      )
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
