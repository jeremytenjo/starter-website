const docsTemplate = () => {
  return {
    path: ({ name }) => `stories/${name}.docs.mdx`,
    template: ({ name, helpers }) => {
      return `import React from 'react'
      import {
        Title,
        Description,
        Primary,
        ArgsTable,
        PRIMARY_STORY,
      } from '@storybook/addon-docs'
      
      // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
      export default function Docs() {
        return (
          <>
            <Title />
            <Description>This is a ${helpers.changeCase.pascalCase(name)}</Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
          </>
        )
      }`
    },
  }
}

const getStoryTemplate = ({ name, type = 'component', helpers, folderPath }) => {
  const isFunction = type === 'function'
  const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`
  let storyPrefix = folderPath.split('src')
  storyPrefix = storyPrefix.pop()
  storyPrefix = storyPrefix.substring(1)

  return `//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
${isFunction ? `import AsyncTester from '@useweb/async-tester'` : ''}

import ${name}, { type ${propsName} } from '../${name}'

import Docs from './${name}.docs.mdx'

const defaultArgs: ${propsName} = {
  name: '${name}',
}

export default {
  title: '${storyPrefix}/${name}',
  args: defaultArgs,
  // https://storybook.js.org/docs/react/writing-docs/docs-page#remixing-docspage-using-doc-blocks
  parameters: {
    docs: {
      page: Docs,
    },
  },
}

const Template = (args: ${propsName}) => {
  ${isFunction ? `const fn = async () => ${name}(args)` : ''}

  return (
    <>
      ${isFunction ? `<AsyncTester fn={fn} autoExec />` : `<${name} {...args} />`}
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
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
}

const componentStory = ({ type }) => {
  return {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers, folderPath }) =>
      getStoryTemplate({ name, type, helpers, folderPath }),
  }
}

const componentStoryFiles = [docsTemplate(), componentStory({ type: 'component' })]
const functionStoryFiles = [docsTemplate(), componentStory({ type: 'function' })]

module.exports = {
  componentStoryFiles,
  functionStoryFiles,
}
