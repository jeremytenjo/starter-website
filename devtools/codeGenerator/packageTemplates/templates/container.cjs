const { getStoryPrefix } = require('./story.cjs')

const files = [
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `${pascalName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const uiName = `${pascalName}Ui`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import Skeleton from '@useweb/ui/Skeleton'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      
      export default function ${pascalName}() {
      // use hooks to get data       
        const data = '${pascalName}'

        return (
          <${uiName}
            data={data}
            loading={false}
            error={false}
          />
        )
      }
      
      export type ${uiName}Props = {
        data: any
        loading: boolean
        error: any
      }
      
      export function ${uiName}(props: ${uiName}Props) {
        if (props.error) {
          return (
            <ErrorMessage
              error={props.error}
              message='Error loading, please refresh and try again.'
            />
          )
        }
      
        return (
          <Box data-id='${pascalName}' sx={{}}>
            <Skeleton loading={props.loading}>
              <Text text={props.data} tag='p' sx={{}} />
            </Skeleton>
          </Box>
        )
      }
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `stories/${pascalName}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const uiName = `${pascalName}Ui`
      const storyPrefix = getStoryPrefix({ folderPath })

      return `import React from 'react'
      import type { Meta, StoryObj } from '@storybook/react'
      
      import {
        ${uiName},
        type ${uiName}Props,
      } from '../${pascalName}'
      
      const defaultArgs: ${uiName}Props = {
        data: '${pascalName}',
        loading: false,
        error: false,
      }
      
      const meta: Meta<typeof ${uiName}> = {
        title:
          '${storyPrefix}/${pascalName}/${pascalName}Ui',
        component: ${uiName},
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      export default meta
      
      type Story = StoryObj<typeof ${uiName}>
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Template = (args: ${uiName}Props) => {
        return (
          <>
            <${uiName} {...args} />
          </>
        )
      }
      
      export const Default: Story = {
        render: (args: ${uiName}Props) => {
          return <Template {...args} />
        },
      }
      
      export const Loading: Story = {
        render: (args: ${uiName}Props) => {
          return <Template {...args} />
        },
        args: {
          loading: true,
        },
      }
      
      export const Error: Story = {
        render: (args: ${uiName}Props) => {
          return <Template {...args} />
        },
        args: {
          error: 'Error',
        },
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
