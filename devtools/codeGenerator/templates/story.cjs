const files = [
  {
    path: ({ name }) => `stories/${name}.docs.mdx`,
    template: ({ name }) => `# ${name}`,
  },
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name }) => {
      const propsName = `${name}Props`
      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
    import React from 'react'

    import ${name}, { type ${propsName} } from '../${name}'

    import Docs from './${name}.docs.mdx'

    const defaultArgs: ${propsName} = {
      name: '${name}',
    }

    export default {
      title: 'lib/components/${name}',
      args: defaultArgs,
      // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
      parameters: {
        docs: {
          page: Docs,
        },
      },
    }

    export const Default = {
      render: (args) => {
        return (
          <>
            <${name} {...args} />
          </>
        )
      },
    }

    // const variantArgs: ${propsName} = {
    //  name: 'World',
    // }
    
    // export const Variant = {
    //  ...Default,
    //  args: variantArgs
    // }
`
    },
  },
]

const template = {
  type: 'Story',
  files,
}

module.exports = {
  files,
  template,
}
