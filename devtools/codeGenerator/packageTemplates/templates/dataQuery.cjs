const pluralize = require('pluralize')
const changeCase = require('change-case')

const { getStoryPrefix } = require('./story.cjs')
const dataQueryUi = require('./dataQueryUi.cjs')

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

const splitCamelCase = (string) => {
  return string.split(/(?=[A-Z])/).map((s) => s.toLowerCase())[0]
}

const getSchemaImportName = (rawName) => {
  const singularName = pluralize.singular(lowercaseFirstLetter(splitCamelCase(rawName)))
  return `${singularName}.schema`
}

const getSchemaName = (rawName) => {
  const schemaName = pluralize.singular(changeCase.pascalCase(splitCamelCase(rawName)))
  return `${schemaName}Schema`
}

// https://github.com/jeremytenjo/super-code-generator/tree/master#component-type-properties
const files = [
  // hook
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/use${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const camelCase = helpers.changeCase.camelCase(name)
      const schemaName = getSchemaName(name)
      const getpropsName = `Get${pascalName}Props`
      const createpropsName = `Create${pascalName}PayloadProps`
      const propsUpdaterName = `Update${pascalName}PayloadProps`
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import useData, { type UseDataProps } from '@useweb/use-data'
      
      import type ${schemaName} from '../../../${getSchemaImportName(name)}'
      
      import useGet${pascalName}, { type ${getpropsName} } from './useGet${pascalName}/useGet${pascalName}'
      import useCreate${pascalName}, { type ${createpropsName} } from './useCreate${pascalName}/useCreate${pascalName}'
      import useUpdate${pascalName}, { type ${propsUpdaterName} } from './useUpdate${pascalName}/useUpdate${pascalName}'
      import useRemove${pascalName}, { type ${removePropsName} } from './useRemove${pascalName}/useRemove${pascalName}'
      
      export type Use${pascalName}Props = {
        getOptions?: UseDataProps<${schemaName}, ${getpropsName}>['get']
        createOptions?: UseDataProps<${schemaName}, ${createpropsName}>['create']
        updateOptions?: UseDataProps<${schemaName}, ${propsUpdaterName}>['update']
        removeOptions?: UseDataProps<${schemaName}, ${removePropsName}>['remove']
      }
      
      export default function use${pascalName}(
        props: Use${pascalName}Props = {},
      ) {
        const get = useGet${pascalName}({...props?.getOptions})
        const create = useCreate${pascalName}(props?.createOptions)
        const update = useUpdate${pascalName}(props?.updateOptions)
        const remove = useRemove${pascalName}(props?.removeOptions)
      
        const ${camelCase} = useData<${schemaName}, ${getpropsName}, ${createpropsName}, ${propsUpdaterName}, ${removePropsName}>({
          id: '${camelCase}',
          get,
          create,
          update,
          remove
        })
      
        return ${camelCase}
      }
      
      `
    },
  },

  // stories
  {
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers, folderPath }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const storyPrefix = getStoryPrefix({ folderPath })

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      // get
      import {
        get${pascalName},
        type Get${pascalName}Props,
      } from '../use${pascalName}/useGet${pascalName}/useGet${pascalName}'
      // create
      //import {
      //  create${pascalName},
      //  type Create${pascalName}PayloadProps,
      //} from '../use${pascalName}/useCreate${pascalName}/useCreate${pascalName}'
      // update
      //import {
      //  update${pascalName},
      //  type Update${pascalName}PayloadProps,
      //} from '../use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}'
      // remove
      //import {
      //  remove${pascalName},
      //  type Remove${pascalName}PayloadProps,
      //} from '../use${pascalName}/useRemove${pascalName}/useRemove${pascalName}'
      
      export default {
        title: '${storyPrefix}/${pascalName}',
        parameters: {
          signInAs: false,
        },
      }
      
      export const Get${pascalName} = {
        render: () => {
          const payload: Get${pascalName}Props = {}
          const fn = async () => get${pascalName}(payload)
          return <AsyncTester fn={fn} autoExec />
        },
      }
      
      // export const Create${pascalName} = {
      //   render: () => {
      //     const payload: Create${pascalName}PayloadProps = {}
      //     const fn = async () => create${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Update${pascalName} = {
      //   render: () => {
      //     const payload: Update${pascalName}PayloadProps = {}
      //     const fn = async () => update${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      
      // export const Remove${pascalName} = {
      //   render: () => {
      //     const payload: Remove${pascalName}PayloadProps = {}
      //     const fn = async () => remove${pascalName}(payload)
      //     return <AsyncTester fn={fn} autoExec />
      //   },
      // }
      `
    },
  },

  // get
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/useGet${pascalName}/useGet${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const schemaName = getSchemaName(name)
      const propsName = `Get${pascalName}Props`

      return `
import { type UseDataProps } from '@useweb/use-data'
import assert from '@useweb/assert'
import { collection, getDocs, query, where } from 'firebase/firestore'
import logError from '@/src/lib/utils/loggers/logError/logError'
import { db } from '@/src/lib/integrations/Google/Firebase/firebase'

import type ${schemaName} from '../../../../${getSchemaImportName(name)}'
import { ${name}CollectionName } from '../../../../${name}.config'

// fetcher
export type ${propsName} = {
  uid: string
}

export const get${pascalName} = async (props: ${propsName}) => {
  assert({ props })
  const ${name}: ${schemaName}[] = []

  const q = query(collection(db, ${name}CollectionName), where('uid', '==', props.uid))

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    ${name}.push(doc.data() as ${schemaName})
  })

  return games
}

// hook
type useGet${pascalName}Props = UseDataProps<${schemaName}>['get']
type useGet${pascalName}Return = UseDataProps<${schemaName}>['get']

export default function useGet${pascalName}(
  props: useGet${pascalName}Props,
): useGet${pascalName}Return {

  const get: useGet${pascalName}Return = {
    ...props,
    fetcher: get${pascalName},

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGet${pascalName}'
      })
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
`
    },
  },

  // create
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/useCreate${pascalName}/useCreate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const schemaName = getSchemaName(name)
      const propsName = `Create${pascalName}PayloadProps`

      return `
      import { type UseDataProps, type CreatorProps } from '@useweb/use-data'
      import { collection, doc, setDoc } from 'firebase/firestore'
      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { db } from '@/src/lib/integrations/Google/Firebase/firebase'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'
      import { ${name}CollectionName } from '../../../../${name}.config'

      export type ${propsName} = any

      // creator
      export const create${pascalName} = async (props: CreatorProps<${schemaName}, ${propsName}>) => {
        if (!props.newItem) {
          throw new Error('Missing newItem prop')
        }
      
        if (!props.newItem.uid) {
          throw new Error('Missing newItem.uid prop')
        }
      
        const newDocRef = doc(collection(db, ${name}CollectionName))
        const newItem: ${schemaName} = {
          ...props.newItem,
          id: newDocRef.id,
        }
      
        await setDoc(newDocRef, newItem)
      
        return { newItem }
      }

      export type Create${pascalName}Return = ReturnType<typeof create${pascalName}>
      
      // hook
      type useCreate${pascalName}Props = UseDataProps<${schemaName}>['create']
      type useCreate${pascalName}Return = UseDataProps<${schemaName}>['create']
      
      export default function useCreate${pascalName}(
        props: useCreate${pascalName}Props,
      ): useCreate${pascalName}Return {
        const create: useCreate${pascalName}Return = {
          creator: create${pascalName},
      
          onCreate: (result) => {
            props?.onCreate && props?.onCreate(result)
          },
      
          onCreateError: (error) => {      
            logError({
              error: error.error, 
              fnName: 'useCreate${pascalName}'
            })
            props?.onCreateError && props?.onCreateError(error)

          },
        }
      
        return create
      }
      `
    },
  },

  // update
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/useUpdate${pascalName}/useUpdate${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const schemaName = getSchemaName(name)
      const propsName = `Update${pascalName}Props`
      const propsUpdaterName = `Update${pascalName}PayloadProps`

      return `import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
      import type { UpdaterReturn } from '@useweb/use-data/build/types/handlers/useUpdate'
      import { doc, updateDoc } from 'firebase/firestore'
      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { db } from '@/src/lib/integrations/Google/Firebase/firebase'

      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'
      import { ${name}CollectionName } from '../../../../${name}.config'

      export type ${propsUpdaterName} = any

      type ${propsName} = UpdaterProps<${schemaName}, ${propsUpdaterName}>
      
      // updater      
      export const update${pascalName} = async (props: ${propsName}): Promise<UpdaterReturn<${schemaName}>> => {
        if (!props.value.id) {
          throw new Error("missing 'id' property on value")
        }
        const ref = doc(db, ${name}CollectionName, props.value.id)
      
        await updateDoc(ref, props.value)
      
        return { updatedItem: props.value }
      }
      
      // hook
      type useUpdate${pascalName}Props = UseDataProps<${schemaName}>['update']
      type useUpdate${pascalName}Return = UseDataProps<${schemaName}>['update']
      
      export default function useUpdate${pascalName}(
        props: useUpdate${pascalName}Props,
      ): useUpdate${pascalName}Return {
      
        const update: useUpdate${pascalName}Return = {
          updater: update${pascalName},
      
          onUpdate: (result) => {
            props?.onUpdate && props.onUpdate(result)
          },
      
          onUpdateError: (error) => {
            logError({
              error: error.error, 
              fnName: 'useUpdate${pascalName}'
            })
            props?.onUpdateError && props.onUpdateError(error)
          },
        }
      
        return update
      }
      
      `
    },
  },

  // remove
  {
    path: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)

      return `use${pascalName}/useRemove${pascalName}/useRemove${pascalName}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name)
      const schemaName = getSchemaName(name)
      const propsName = `Remove${pascalName}Props`
      const removePropsName = `Remove${pascalName}PayloadProps`

      return `import { type UseDataProps, type RemoverProps } from '@useweb/use-data'
      import { doc, deleteDoc } from 'firebase/firestore'
      import logError from '@/src/lib/utils/loggers/logError/logError'
      import { db } from '@/src/lib/integrations/Google/Firebase/firebase'

      import { ${name}CollectionName } from '../../../../${name}.config'
      import type ${schemaName} from '../../../../${getSchemaImportName(name)}'

      export type ${removePropsName} = any

      type ${propsName} = RemoverProps<${schemaName}, ${removePropsName}>
      
      // remover
      export const remove${pascalName} = async (props: ${propsName}) => {
        if (!props.removedItemId) throw new Error('No id provided to remove${pascalName}')
        
        await deleteDoc(doc(db, ${name}CollectionName, props.removedItemId as string))
      }
      
      // hook
      type useRemove${pascalName}Props = UseDataProps<${schemaName}>['remove']
      type useRemove${pascalName}Return = UseDataProps<${schemaName}>['remove']
      
      export default function useRemove${pascalName}(
        props: useRemove${pascalName}Props,
      ): useRemove${pascalName}Return {
      
        const remove: useRemove${pascalName}Return = {
          remover: remove${pascalName},
      
          onRemove: (result) => {
            props?.onRemove && props.onRemove(result)
          },
      
          onRemoveError: (error) => {
            logError({
              error: error.error, 
              fnName: 'useRemove${pascalName}'
            })
            props?.onRemoveError && props.onRemoveError(error)
          },
        }
      
        return remove
      }
      
`
    },
  },

  // ui
  ...dataQueryUi.files,
]

const template = {
  type: 'Data Query',
  files,
}

module.exports = {
  files,
  template,
}
