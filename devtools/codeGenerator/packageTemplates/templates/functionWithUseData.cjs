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
} from '../${name}'
import logError from '@/src/lib/utils/loggers/logError/logError'

export type Use${propsName} =
  Partial<${propsName}>

export const get${pascalCase}Id = (
  props: Use${propsName},
) => {
  return props.buyerUid && props.creatorUid && props.gameId
    ? ${'"${name}/${props.creatorUid}/${props.gameId}/${props.buyerUid}"'} 
    : undefined
}

export default function use${pascalCase}(
  props: Use${propsName},
) {
  const ${name} = useData<
    Awaited<${returnName}>,
    ${propsName}
  >({
    id: get${pascalCase}Id(props),
    get: {
      fetcher: async () => {
        const ${name}Res = await _${name}(
          props as ${propsName},
        )

        if (${name}Res.id) {
          return [${name}Res]
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'use${pascalCase}',
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
