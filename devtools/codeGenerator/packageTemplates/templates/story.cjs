const changeCase = require('change-case')

const functionWithComponentName = 'Function with Component'

const docsTemplate = () => {
  return {
    path: ({ name, type }) => {
      const prefix = type === functionWithComponentName ? 'ui/' : ''
      return `${prefix}stories/${name}.docs.tsx`
    },
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
  const isFunctionWithComponent = type === 'Function with Component'
  const titleNamePrefix = isFunctionWithComponent ? `ui/` : ''
  const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
  const isFunction = type === 'function'
  const returnName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Return`
  const storyPrefix = getStoryPrefix({ folderPath })
  const pascalCase = helpers.changeCase.pascalCase(name)
  const camelCase = helpers.changeCase.camelCase(name)
  const componentFunctionName = `${
    isFunction ? camelCase : pascalCase
  }${componentNameAffix}`
  const propsName = `${pascalCase}${componentNameAffix}Props`

  return `//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
${
  isFunction
    ? `import AsyncTester from '@useweb/async-tester'`
    : `import PixelPerfect from '@useweb/pixel-perfect'`
}

${
  importOverride ||
  `import ${componentFunctionName}, { type ${propsName} ${
    isFunction ? `, type ${returnName}` : ''
  } } from '../${componentFunctionName}'`
}

const defaultArgs: ${propsName} = {
 ${!storiesDefaultArgs ? `name: '${componentFunctionName}',` : storiesDefaultArgs}
}

export default {
  title: '${storyPrefix}/${titleNamePrefix}${changeCase.capitalCase(name)}',
  args: defaultArgs,
}

const Template = (args: typeof defaultArgs) => {
  ${
    isFunction
      ? `const fn = async (triggerProps = {}) => {
        return await ${componentFunctionName}({ ...args, ...triggerProps })
      }`
      : ''
  }

  return (
    <>
      ${
        isFunction
          ? `<AsyncTester<${returnName}, ${propsName}> fn={fn} autoExec />`
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
          <${componentFunctionName} {...args} />`
      }
    </>
  )
}

export const Default = {
  render: (args: ${propsName}) => {
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

const componentStory = ({ type, prefix = '' }) => {
  return {
    path: ({ name }) => {
      return `${prefix}stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) =>
      getStoryTemplate({ name, type, helpers, folderPath }),
  }
}

const componentStoryFiles = [componentStory({ type: 'component' })]
const functionStoryFiles = [componentStory({ type: 'function' })]
const functionWithComponentStoryFiles = [
  componentStory({ type: 'Function with Component', prefix: 'ui/' }),
]

module.exports = {
  componentStoryFiles,
  functionStoryFiles,
  functionWithComponentStoryFiles,
  docsTemplate,
  getStoryTemplate,
  getStoryPrefix,
}
