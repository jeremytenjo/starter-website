const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, slots = {} }) => {
      const noChildContainers = !slots?.childContainers

      return `import React from 'react'
    
    import ${name}Ui${renderIfTrue(
        noChildContainers,
        `, { type ${name}UiProps }`,
      )} from './${name}Ui/${name}.ui'
    
    export default function ${name}() {
      ${renderIfTrue(
        noChildContainers,
        `const uiProps: ${name}UiProps = {
          title: '${name}'
         }`,
      )}



      ${noChildContainers ? `return <${name}Ui {...uiProps} />` : `return <${name}Ui />`}

    }`
    },
  },
  {
    path: ({ name }) => `${name}Ui/${name}.ui.tsx`,
    template: ({ name, helpers, slots = {} }) => {
      const noChildContainers = !slots?.childContainers
      const propsName = `${helpers.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}UiProps`

      return `import React from 'react'
    import Box from '@useweb/ui/Box'

    ${slots?.childContainers?.importStatements || ''}

    ${renderIfTrue(
      noChildContainers,
      `export type ${propsName} = {
      title: string
    }`,
    )}


    export default function ${name}Ui(${renderIfTrue(
        noChildContainers,
        `props: ${propsName}`,
      )}) {        
      return (
        <Wrapper>
          ${renderIfTrue(noChildContainers, `<Title {...props} />`)}
          ${slots?.childContainers?.importedComponents || ''}
          ${slots?.localComponents?.localComponentsDeclarations || ''}
        </Wrapper>
      )
    }
    
    const Wrapper = ({ children }) => {
      return <Box data-id='${name}' sx={{}}>{children}</Box>
    }

    ${renderIfTrue(
      noChildContainers,
      `const Title = (props: ${propsName}) => {
      return (
        <Box data-id='Title' sx={{}}>
          {props.title}
        </Box>
      )
    }`,
    )}

    ${slots?.localComponents?.localComponents || ''}

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

const renderIfTrue = (condition, string) => {
  return condition ? string : ``
}
