import path from 'path'

import createFile from '../../../../../utils/node/createFile'
import { type ContextProps } from '../../generateApp'

export type DataProps = {
  context: ContextProps
  data: {
    name: string
  }[]
}

export default async function handleData({ data = [], context }: DataProps) {
  const dataDir = path.join(context.rootDir, 'src', 'data')

  await Promise.all(
    data.map((item) => {
      // console.log(item)
    }),
  )
}
