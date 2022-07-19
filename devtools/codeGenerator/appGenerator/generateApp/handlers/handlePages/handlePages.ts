import path from 'path'

import { type ContainerProps } from '../../sharedTypes'
import { type ContextProps } from '../../generateApp'
import genCodeFromTemplate from '../../utils/genCodeFromTemplate/genCodeFromTemplate.js'

export type PagesProps = {
  context: ContextProps
  pages: {
    name: string
    containers?: ContainerProps[]
  }[]
}

export default async function handlePages({ pages = [], context }: PagesProps) {
  const pagesDir = path.join(context.rootDir, 'src', 'pages')
  const pagesContentDir = path.join(context.rootDir, 'src', 'pagesContent')

  await Promise.all(
    pages.map(async (page: PagesProps['pages'][0]) => {
      await genCodeFromTemplate({
        name: page.name,
        files: context.templates.page,
        outputPath: pagesDir,
      })

      await genCodeFromTemplate({
        name: page.name,
        files: context.templates.pageContent,
        outputPath: pagesContentDir,
      })
    }),
  )
}
