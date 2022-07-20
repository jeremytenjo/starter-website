import path from 'path'

import { type ContextProps } from '../../generateApp'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'

export type DataProps = {
  context: ContextProps
  data: {
    name: string
  }[]
}

export default async function handleData({ data = [], context }: DataProps) {
  if (!data.length) return { noData: true }

  const dataDir = path.join(context.rootDir, 'src', 'data')

  await Promise.all(
    data.map(async (item: DataProps['data'][0]) => {
      // create items
      await genCodeFromTemplate({
        name: item.name,
        files: context.templates.data,
        outputPath: dataDir,
      })
    }),
  )
}
