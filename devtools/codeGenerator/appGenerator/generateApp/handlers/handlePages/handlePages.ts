import path from 'path'

import createFile from '../../../../../utils/node/createFile'
import { type ContainerProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'

export type PagesProps = {
  context: ContextProps
  pages: {
    name: string
    path: string
    containers?: ContainerProps[]
  }[]
}

export default async function handlePages({ pages = [], context }: PagesProps) {
  const pagesDir = path.join(context.rootDir, 'src', 'pages')
  const pagesContentDir = path.join(context.rootDir, 'src', 'pagesContent')

  await Promise.all(
    pages.map((page) => {
      console.log(page)
    }),
  )
}
