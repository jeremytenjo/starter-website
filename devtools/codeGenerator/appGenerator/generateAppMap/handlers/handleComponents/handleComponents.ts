import path from 'path'

import changeCase from 'change-case'

import { type ComponentProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateAppMap'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'
import superCodeGenSchema from '../../../../superCodeGen.schema.cjs'
import log from '../../../../../utils/node/log.js'

export type ComponentsProps = {
  context: ContextProps
  components: {
    name: string
    folder?: string
    template?: string
    localComponents?: ComponentProps[]
  }[]
}

export default async function handleComponents({
  components = [],
  context,
}: ComponentsProps) {
  if (!components.length) return { noComponents: true }

  const componentsDir = path.join(context.rootDir, 'src', 'lib', 'components')

  await Promise.all(
    components.map(async (component: ComponentsProps['components'][0]) => {
      // create components
      const files = getFilesTemapte({ context, template: component.template })
      await genCodeFromTemplate({
        name: component.name,
        files,
        outputPath: path.join(componentsDir, component.folder || ''),
        slots: getSlots({
          localComponents: component.localComponents as any,
          parentName: component.name,
        }),
      })
    }),
  )
}

const getSlots = ({ localComponents = [], parentName }) => {
  // create local component slots
  let localComponentsString = ''
  let localComponentsDeclarationsString = ''

  localComponents.map((component: { name: string }) => {
    const componentName = changeCase.pascalCase(component.name)

    localComponentsDeclarationsString += `<${componentName} {...props} /> \n`
    localComponentsString += `const ${componentName} = (props: ${parentName}Props) => {
      return (
        <Box data-id='${componentName}' sx={{}}>
        ${componentName}
        </Box>
        )
      } \n \n`
  })

  const slots: any = {
    localComponents: {
      localComponentsDeclarations: localComponentsDeclarationsString,
      localComponents: localComponentsString,
    },
  }

  if (!localComponents.length) delete slots.localComponents

  return slots
}

const getFilesTemapte = ({ context, template }) => {
  let files = context.templates.component

  if (template) {
    files = superCodeGenSchema.find((s) => s.type === template)?.files || []

    if (!files.length) {
      log(`Template ${template} does not exists in your super code gen schema`, {
        error: true,
      })
    }
  }

  return files
}
