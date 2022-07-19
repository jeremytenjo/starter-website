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
      // create page
      await genCodeFromTemplate({
        name: page.name,
        files: context.templates.page,
        outputPath: pagesDir,
      })

      // create page content
      await genCodeFromTemplate({
        name: page.name,
        files: context.templates.pageContent,
        outputPath: pagesContentDir,
      })

      // create page content containers
      const { containers = [] } = page

      const recursiveCreateContainers = async ({ containersToGen }) => {
        if (containersToGen?.length) {
          await Promise.all(
            containersToGen.map(async (container: ContainerProps) => {
              await createContainers({
                containers: page.containers,
                name: container.name,
                outputPath: pagesContentDir,
                files: context.templates.container,
                parentFolderName: page.name,
              })

              if (container.containers) {
                console.log({ containersToGen, container })

                await recursiveCreateContainers({ containersToGen: container.containers })
              }
            }),
          )
        }
      }

      await recursiveCreateContainers({ containersToGen: containers })
    }),
  )
}

const createContainers = async ({
  containers,
  name,
  outputPath,
  files,
  parentFolderName,
}) => {
  const outputPathFinal = path
    .join(outputPath, parentFolderName, 'containers', name)
    .replaceAll(' ', '')

  await genCodeFromTemplate({
    name,
    files,
    outputPath: outputPathFinal,
    noParentFolder: true,
  })
}
