import path from 'path'

import { type ContextProps } from '../../generateAppMap'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'

type ComponentsProps = {
  name: string
}[]

export type DataProps = {
  context: ContextProps
  data: {
    name: string
    components?: ComponentsProps
  }[]
}

export default async function handleData({ data = [], context }: DataProps) {
  if (!data.length) return { noData: true }

  const dataDir = path.join(context.rootDir, 'src', 'data')

  await Promise.all(
    data.map(async (item: DataProps['data'][0]) => {
      // create data items
      await genCodeFromTemplate({
        name: item.name,
        files: context.templates.data,
        outputPath: dataDir,
      })

      // create data components
      if (item.components) {
        await Promise.all(
          item.components.map(async (dataComponent: ComponentsProps[0]) => {
            if (!dataComponent) return null

            const dataComponentOutputPath = path.join(dataDir, item.name, 'components')

            await genCodeFromTemplate({
              name: dataComponent.name,
              files: context.templates.component,
              outputPath: dataComponentOutputPath,
            })
          }),
        )
      }
    }),
  )
}
