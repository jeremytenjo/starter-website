import path from 'path'

import changeCase from 'change-case'

import { type ComponentProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateAppMap'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'

export type ComponentsProps = {
  context: ContextProps
  components: {
    name: string
    folder?: string
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
      await genCodeFromTemplate({
        name: component.name,
        files: context.templates.component,
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
