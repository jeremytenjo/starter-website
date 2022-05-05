// Storybook story

// const files = [
//   {
//     path: () => `stories/docs.mdx`,
//     template: ({ name }) => `# ${name}`,
//   },
//   {
//     path: () => `stories/sb.stories.tsx`,
//     template: ({ name }) => `//https://storybook.js.org/docs/react/writing-docs/docs-page
//     import React from 'react'

//     import ${name} from '../${name}'

//     import Docs from './docs.mdx'

//     export default {
//       title: 'lib/components/${name}',
//       args: {},
//       // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
//       parameters: {
//         docs: {
//           page: Docs,
//         },
//       },
//     }

//     const Template = (args) => {
//       return <${name} {...args} />
//     };

//     export const Example = Template.bind({});
//     // Example.args = {};
// `,
//   },
// ]

// Ladle Story

const files = [
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name }) => `// https://www.ladle.dev/docs/stories
    import React from 'react'
    import type { Story } from '@ladle/react'
    
    import ${name}, { type ${name}Props } from '../${name}'
    
    export default {
      title: 'Lib/components/${name}',
    }
    
    const Template: Story<${name}Props> = (args) => {
      return (
        <>
          <${name} {...args} />
        </>
      )
    }
    
    export const Default = Template.bind({})

    const defaultArgs: ${name}Props = {
      name: '${name}',
    }
    
    Default.args = defaultArgs
    
    // export const Variant = Template.bind({})

    // const VariantArgs: ${name}Props = {
    //  ...defaultArgs,
    //  name: 'World',
    // }
    
    // Variant.args = VariantArgs
`,
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
