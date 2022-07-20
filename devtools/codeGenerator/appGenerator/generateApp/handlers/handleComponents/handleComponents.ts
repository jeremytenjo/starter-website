import path from 'path'

import { type ComponentProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'

export type ComponentsProps = {
  context: ContextProps
  components: {
    name: string
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
        outputPath: componentsDir,
      })
    }),
  )
}
