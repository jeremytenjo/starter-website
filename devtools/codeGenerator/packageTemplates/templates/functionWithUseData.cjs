const functions = require('./function.cjs')

const template = {
  type: 'Function with useData',
  files: [
    ...functions.files,
    {
      path: ({ name, helpers }) => {
        const pascalCase = helpers.changeCase.pascalCase(name)

        return `use${pascalCase}/use${pascalCase}.ts`
      },
      template: ({ name, helpers }) => {
        const pascalCase = helpers.changeCase.pascalCase(name)
        const propsName = `${pascalCase}Props`
        const returnName = `${pascalCase}Return`

        return `
        import useData from '@useweb/use-data'
import _${name}, {
  type ${propsName},
  type ${returnName},
} from '../${name}.js'
import logError from '@/src/lib/utils/loggers/logError/logError'

export type Use${propsName} = ${propsName}

export const get${pascalCase}DataId = (
  props: Partial<Use${propsName}>,
) => {
  const dataId = props.uid
    ? ${'`'}${name}${'/${props.uid}'}${'`'}
    : undefined

  return {
    id: dataId,
  }
}

export default function use${pascalCase}(
  props: Partial<Use${propsName}>,
) {
  const ${name} = useData<
    Awaited<${returnName}>,
    ${propsName}
  >({
    id: get${pascalCase}DataId(props).id,
    get: {
      fetcher: async () => {
        const ${name}Res = await _${name}(
          props as ${propsName},
        )

        if (${name}Res) {
          return [${name}Res]
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'use${pascalCase}',
          metadata: props.metadata,
        })
      },
    },
  })

  return ${name}
}

export type Use${returnName} = ReturnType<
  typeof use${pascalCase}
>
`
      },
    },
  ],
}

module.exports = {
  template,
}
