const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name, helpers }) => {
      const namePascalCase = helpers.changeCase.pascalCase(name)
      const propsName = `${namePascalCase}Props`
      return `import React from 'react'       
    import Box from '@mui/material/Box'

    import Text from '@/lib/components/Text/Text'
  
    export type ${propsName} = { name: string }
  
    export default function ${namePascalCase}({ name = 'Hello' }: ${propsName}) {
      return (
        <Wrapper>
          <Text text={name} />
        </Wrapper>
      );
    }

    const Wrapper = ({ children }) => {
      return <Box data-id='${name}' sx={{}}>{children}</Box>
    }
      `
    },
  },
]

const template = {
  type: 'Component - Simple',
  files,
}

module.exports = {
  files,
  template,
}
