const pluralize = require('pluralize')
const changeCase = require('change-case')

const { getStoryPrefix } = require('./story.cjs')

const getSchemaImportPath = (rawName) => {
  const singularName = pluralize.singular(changeCase.camelCase(rawName))
  return `@/src/data/${rawName}/${singularName}.schema.js`
}

const getStubsImportPath = (rawName) => {
  const nameCamelCase = changeCase.camelCase(rawName)
  return `@/src/data/${rawName}/${nameCamelCase}.stubs.js`
}

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // List component

  // ui main
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/${ListComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`
      const useName = `use${pascalName}`
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const camelCase = helpers.changeCase.camelCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import UseDataUi from '@useweb/use-data-ui'
      
      import ${useName}, {
        type Use${pascalName}Props,
      } from '../../${useName}/${useName}'
      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'
      
      import ${ListComponentName}Data from './${ListComponentName}Data/${ListComponentName}Data.js'
      import ${ListComponentName}EmptyData from './${ListComponentName}EmptyData/${ListComponentName}EmptyData.js'
      import ${ListComponentName}Loading from './${ListComponentName}Loading/${ListComponentName}Loading.js'
      import ${ListComponentName}Error from './${ListComponentName}Error/${ListComponentName}Error.js'
      
      export type ${ListComponentName}Props = {
        dataConfig?: Use${pascalName}Props
      }
      
      export default function ${ListComponentName}(props: ${ListComponentName}Props) {
        const ${camelCase} = ${useName}(props.dataConfig)
      
        return (
          <Wrapper>
            <UseDataUi<${nameSinglePascal}Schema>
              asyncFunctionVariable={${camelCase}}
              data={${ListComponentName}Data}
              emptyData={${ListComponentName}EmptyData}
              loading={${ListComponentName}Loading}
              error={${ListComponentName}Error}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui with data
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/${ListComponentName}Data/${ListComponentName}Data.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      import Skeleton from '@useweb/ui/Skeleton'
      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'
      
      export type ${ListComponentName}DataProps = UseDataUiComponentProps<${nameSinglePascal}Schema>['data']

      export const listSx = {
        gap: '10px',
      }
      
      export default function ${ListComponentName}Data(props: ${ListComponentName}DataProps) {
        return (
          <Wrapper>
            <List<${nameSinglePascal}Schema>
              data={props.data || []}
              ListItemComponent={({ itemData }) => {
                return <${ListComponentName}Item ${nameSingle}={itemData} />
              }}
              sx={{
                ...listSx,
              }}
            />
          </Wrapper>
        )
      }

      export function ${ListComponentName}Item(props: { ${nameSingle}?: ${nameSinglePascal}Schema; loading?: boolean }) {
        return (
          <Box data-id='${ListComponentName}Item' sx={{}}>
            <Skeleton loading={props.loading}>
              ${ListComponentName}Item
            </Skeleton>
          </Box>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Data' sx={{}}>
            {children}
          </Box>
        )
      }`
    },
  },

  // ui empty data
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/${ListComponentName}EmptyData/${ListComponentName}EmptyData.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import EmptyMessage from '@useweb/ui/EmptyMessage'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'
      
      export type ${ListComponentName}EmptyDataProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['emptyData']
      
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      export default function ${ListComponentName}EmptyData(props: ${ListComponentName}EmptyDataProps) {
        return <Wrapper>
                <EmptyMessage subTitle='${ListComponentName}EmptyData' />
              </Wrapper>
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}EmptyData' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui loading
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/${ListComponentName}Loading/${ListComponentName}Loading.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import List from '@useweb/ui/List'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      import { ${ListComponentName}Item, listSx } from '../${ListComponentName}Data/${ListComponentName}Data'

      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'
      
      export type ${ListComponentName}LoadingProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['loading']
      
      export default function ${ListComponentName}Loading() {
        const array = Array.from({ length: 5 }).map((_, id) => ({
          id: id.toString(),
        }))

        return (
          <Wrapper>
            <List<any>
              data={array || []}
              ListItemComponent={() => {
                return <${ListComponentName}Item loading />
              }}
            sx={listSx}
          />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Loading' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui error
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/${ListComponentName}Error/${ListComponentName}Error.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const ListComponentName = `${pascalName}List`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
      
      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'
      
      export type ${ListComponentName}ErrorProps =
        UseDataUiComponentProps<${nameSinglePascal}Schema>['error']
      
      export default function ${ListComponentName}Error(props: ${ListComponentName}ErrorProps) {
        return (
          <Wrapper>
            <ErrorMessage error={props.error} message='Error loading ${name}' />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${ListComponentName}Error' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },

  // ui stories
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const ListComponentName = `${pascalName}List`

      return `queries/${pascalName}/ui/${ListComponentName}/stories/${ListComponentName}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath })
      const ListComponentName = `${pascalName}List`

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      import React from 'react'
      
      import ${pascalName}Stubs from '${getStubsImportPath(name)}'
      import ${ListComponentName}, { type ${ListComponentName}Props } from '../${ListComponentName}.js'
      import ${ListComponentName}Data_ from '../${ListComponentName}Data/${ListComponentName}Data.js'
      import ${ListComponentName}EmptyData_ from '../${ListComponentName}EmptyData/${ListComponentName}EmptyData.js'
      import ${ListComponentName}Loading_ from '../${ListComponentName}Loading/${ListComponentName}Loading.js'
      import ${ListComponentName}Error_ from '../${ListComponentName}Error/${ListComponentName}Error.js'
      
      const defaultArgs: ${ListComponentName}Props = {
        dataConfig: {
          getOptions: {
            onGet: ({ result }) => console.log({ result }),
          },
        },
      }
      
      export default {
        title: '${storyPrefix}/${pascalName}/ui/${ListComponentName}',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      // full example
      export const ${ListComponentName}Example = {
        render: (args) => {
          return (
            <>                
                {/* pass fetcher payload via dataConfig.getOptions.fetcherPayload */}
                <${ListComponentName} {...args} />
            </>
          )
        },
      }
      
      // data
      export const ${ListComponentName}WithData = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Data_ {...commonProps} data={${pascalName}Stubs} />
            </>
          )
        },
        parameters: {
          ignoreAuthUserSetter: true,
        },
      }
      
      // empty data
      export const ${ListComponentName}EmptyData = {
        render: () => {
          return (
            <>      
              <${ListComponentName}EmptyData_ {...commonProps} />
            </>
          )
        },
        parameters: {
          ignoreAuthUserSetter: true,
        },
      }
      
      // loading
      export const ${ListComponentName}Loading = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Loading_ />
            </>
          )
        },
        parameters: {
          ignoreAuthUserSetter: true,
        },
      }
      
      // error
      export const ${ListComponentName}Error = {
        render: () => {
          return (
            <>      
              <${ListComponentName}Error_
                {...commonProps}
                error={new Error('${ListComponentName} failed')}
              />
            </>
          )
        },
        parameters: {
          ignoreAuthUserSetter: true,
        },
      }
      
      const commonProps = {
        exec: () => null,
      }
      `
    },
  },
  // Form component
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}Form`

      return `queries/${pascalName}/ui/${componentName}/${componentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)
      const nameSingleCamel = helpers.changeCase.camelCase(nameSingle)

      return `import React, { useMemo, useState } from 'react'
      import Button from '@useweb/ui/Button'
      import Dialog from '@useweb/ui/Dialog'
      import Box from '@useweb/ui/Box'
      import ErrorMessage from '@useweb/ui/ErrorMessage'
      import TextField from '@useweb/ui/TextField'
      import Form, { ResetForm } from '@useweb/ui/Form'
      import use${pascalName} from '../../use${pascalName}/use${pascalName}.js'
      import type ${nameSinglePascal}Schema from '${getSchemaImportPath(name)}'

      import useAuth from '../../../../../../lib/integrations/Google/Firebase/auth/useAuth/useAuth.js'
      
      export type ${pascalName}FormProps = { ${nameSingleCamel}Id?: string }
      
      export default function ${pascalName}Form(props: ${pascalName}FormProps) {
        const auth = useAuth()
      
        const ${name} = use${pascalName}({
          getOptions: {
            fetcherPayload: {
              uid: auth.user?.id,
            },
          },
        })
      
        const defaultValues = useMemo(() => {
          const existing${nameSinglePascal} = ${name}.get?.data?.find((${nameSingle}) => ${nameSingle}.id === props.${nameSingleCamel}Id)
          return existing${nameSinglePascal}
        }, [${name}.get?.data])
      
        const onSubmit = (formData: {values: ${nameSinglePascal}Schema}) => {
          if (Boolean(defaultValues)) {
            ${name}.update.exec({
              value: {
                ...defaultValues,
                ...formData.values,
              },
            })
          } else {
            ${name}.create.exec({
              newItem: {
                ...formData.values,
                uid: auth.user?.id,
              },
            })
          }
        }
      
        return (
          <Form data-id='${pascalName}Form' onSubmit={onSubmit} defaultValues={defaultValues}>
            <ResetForm resetIfTrue={Boolean(defaultValues)} values={defaultValues} />
      
            <Box data-id='${pascalName}FormFields' sx={{}}>
              <TextField<${nameSinglePascal}Schema> name='name' label='Name' sx={{
                width: '100%',
              }} />
            </Box>
      
            <ErrorMessage
              error={${name}.create.error}
              message='Error saving. Please refresh page and try again.'
              sx={{
                mt: 2,
              }}
            />
      
            <Button
              type='submit'
              name='Submit ${pascalName} Form'
              sx={{ mt: 2, width: ['100%', 'fit-content'] }}
            >
              Save
            </Button>
          </Form>
        )
      }
      
      export function ${pascalName}FormDialog(props: ${pascalName}FormProps) {
        const [open, setOpen] = useState(false)
      
        return (
          <>
            <Button
              name='Add ${nameSinglePascal}'
              sx={{
                width: 'fit-content',
              }}
              onClick={() => setOpen(true)}
            >
              Add ${nameSinglePascal}
            </Button>
      
            <Dialog open={open} onClose={() => setOpen(false)}>
              <${pascalName}Form {...props} />
            </Dialog>
          </>
        )
      }
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const componentName = `${pascalName}Form`

      return `queries/${pascalName}/ui/${componentName}/stories/${componentName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSingleCamel = helpers.changeCase.camelCase(nameSingle)

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
      import React from 'react'
      
      import ${pascalName}Form, { type ${pascalName}FormProps } from '../${pascalName}Form'
      
      const defaultArgs: ${pascalName}FormProps = {}
      
      export default {
        title: 'data/${name}/queries/${pascalName}/ui/${pascalName} Form',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Template = (args: ${pascalName}FormProps) => {
        return (
          <>
            <${pascalName}Form {...args} />
          </>
        )
      }
      
      export const Create = {
        render: (args: ${pascalName}FormProps) => {
          return <Template {...args} />
        },
      }
      
      export const Update = {
        ...Create,
        args: {
          ...defaultArgs,
          ${nameSingleCamel}Id: '1',
        } as ${pascalName}FormProps,
      }
      `
    },
  },

  // Remove Dialog component
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const RemoveComponentName = `${pascalName}RemoveButton`

      return `queries/${pascalName}/ui/${RemoveComponentName}/${RemoveComponentName}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const nameSingle = pluralize.singular(name)
      const nameSinglePascal = helpers.changeCase.pascalCase(nameSingle)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import ConfirmationButton from '@useweb/ui/ConfirmationButton'
      import useSnackbar from '@useweb/ui/Snackbar'
      import use${pascalName} from '../../use${pascalName}/use${pascalName}.js'
      
      export type ${pascalName}RemoveButtonProps = { id: string }
      
      export default function ${pascalName}RemoveButton(props: ${pascalName}RemoveButtonProps) {
        const snackbar = useSnackbar()
        const ${name} = use${pascalName}({
          removeOptions: {
            onRemove() {
              snackbar.show({
                message: '${nameSinglePascal} removed',
                severity: 'success',
              })
            },
          },
        })
      
        return (
          <Wrapper>
            <ConfirmationButton
              fn={{
                fn: async () => {
                  if (!props.id) throw new Error('No id provided')
      
                  return await ${name}.remove.exec({
                    id: props.id,
                  })
                },
              }}
              acceptButtonProps={{
                acceptText: 'Remove ${nameSinglePascal}',
              }}
              triggerButtonProps={{
                name: 'remove ${nameSingle}',
                label: 'Remove ${nameSinglePascal}',
                variant: 'severe',
                sx: {
                  width: 'fit-content',
                  whiteSpace: 'nowrap',
                },
              }}
              dialogProps={{
                title: 'Remove ${nameSinglePascal}',
                children: <>Remove ${nameSinglePascal}?</>,
              }}
            />
          </Wrapper>
        )
      }
      
      const Wrapper = ({ children }) => {
        return (
          <Box data-id='${pascalName}RemoveButton' sx={{}}>
            {children}
          </Box>
        )
      }
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const RemoveComponentName = `${pascalName}RemoveButton`

      return `queries/${pascalName}/ui/${RemoveComponentName}/stories/${RemoveComponentName}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
      import React from 'react'
      
      import ${pascalName}RemoveButton, { type ${pascalName}RemoveButtonProps } from '../${pascalName}RemoveButton'
      
      const defaultArgs: ${pascalName}RemoveButtonProps = {
        id: '1',
      }
      
      export default {
        title: 'data/${name}/queries/${pascalName}/ui/${pascalName} Remove Dialog',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Template = (args: ${pascalName}RemoveButtonProps) => {
        return (
          <>
            <${pascalName}RemoveButton {...args} />
          </>
        )
      }
      
      export const Default = {
        render: (args: ${pascalName}RemoveButtonProps) => {
          return <Template {...args} />
        },
      }
      
      // export const Variant = {
      //  ...Default,
      //  args: {
      //  ...defaultArgs,
      // } as ${pascalName}RemoveButtonProps
      // }
      `
    },
  },
]

const template = {
  type: 'Data Query UI',
  files,
}

module.exports = {
  files,
  template,
  getSchemaImportPath,
}
