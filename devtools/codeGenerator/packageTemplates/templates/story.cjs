const docsTemplate = () => {
  return {
    path: ({ name }) => `stories/${name}.docs.tsx`,
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

const getStoryPrefix = ({ folderPath }) => {
  let storyPrefix = folderPath.split('src')
  storyPrefix = storyPrefix.pop()
  storyPrefix = storyPrefix.substring(1)

  return storyPrefix
}

const getStoryTemplate = ({
  name,
  type = 'component',
  helpers,
  folderPath,
  importOverride,
  storiesDefaultArgs,
}) => {
  const isFunction = type === 'function'
  const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`
  const returnName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Return`
  const storyPrefix = getStoryPrefix({ folderPath })

  return `//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
${
  isFunction
    ? `import AsyncTester from '@useweb/async-tester'`
    : `import PixelPerfect from '@useweb/pixel-perfect'`
}

${
  importOverride ||
  `import ${name}, { type ${propsName} ${
    isFunction ? `, type ${returnName}` : ''
  } } from '../${name}'`
}

import Docs from './${name}.docs'

const defaultArgs: ${propsName} = {
 ${!storiesDefaultArgs ? `name: '${name}',` : storiesDefaultArgs}
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
  ${
    isFunction
      ? `const fn = async (triggerProps = {}) => ${name}({ ...args, ...triggerProps })`
      : ''
  }

  return (
    <>
      ${
        isFunction
          ? `<AsyncTester fn={fn} autoExec />`
          : `
          <PixelPerfect
            assets={[
              {
                width: 0,
                url: '',
              },
              {
                width: 1920,
                url: '',
              },
            ]}
          /> 
          <${name} {...args} />`
      }
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
  docsTemplate,
  getStoryTemplate,
  getStoryPrefix,
}
