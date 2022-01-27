const files = [
  {
    path: () => `stories/docs.mdx`,
    template: ({ name }) => `# ${name}`,
  },
  {
    path: () => `stories/sb.stories.tsx`,
    template: ({ name }) => `//https://storybook.js.org/docs/react/writing-docs/docs-page
    import React from 'react'

    import ${name} from '../${name}'

    import Docs from './docs.mdx'

    export default {
      title: 'lib/components/${name}',
      args: {},
      // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
      parameters: {
        docs: {
          page: Docs,
        },
      },
    }

    const Template = (args) => {
      return <${name} {...args} />
    };

    export const Example = Template.bind({});
    // Example.args = {};
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
