// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const capitalName = helpers.changeCase.capitalCase(name)
      const propsName = `Use${capitalName.split(' ').join('')}Props`

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      import { useRouter } from 'next/router'
      
      import useGet${capitalName} from './useGet${capitalName}/useGet${capitalName}'
      import useCreate${capitalName} from './useCreate${capitalName}/useCreate${capitalName}'
      import useUpdate${capitalName} from './useUpdate${capitalName}/useUpdate${capitalName}'
      import useRemove${capitalName} from './useRemove${capitalName}/useUpdate${capitalName}'
      
      export type ${propsName} = {
        getOptions?: UseDataProps['get']
        createOptions?: UseDataProps['create']
        updateOptions?: UseDataProps['update']
        removeOptions?: UseDataProps['remove']
      }
      
      export default function use${capitalName}(props: ${propsName} = {}) {
        const router = useRouter()
        const get = useGet${capitalName}(props?.getOptions)
        const create = useCreate${capitalName}(props?.createOptions)
        const update = useUpdate${capitalName}(props?.updateOptions)
        const remove = useRemove${capitalName}(props?.removeOptions)
      
        const streamLinks = useData({
          id: '${name}',
          get,
          create,
        })
      
        return streamLinks
      }`
    },
  },
]

const template = {
  type: 'Data Local',
  files,
}

module.exports = {
  files,
  template,
}
