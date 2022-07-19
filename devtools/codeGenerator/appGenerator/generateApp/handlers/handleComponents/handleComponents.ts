import path from 'path'

import createFile from '../../../../../utils/node/createFile'
import { type ComponentProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'

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
  const componentsDir = path.join(context.rootDir, 'src', 'lib', 'components')

  await Promise.all(
    components.map(async (component: ComponentsProps['components'][0]) => {
      // console.log(component)
    }),
  )
}
