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

      await recursiveCreateContainers({
        containersToGen: containers,
        outputPath: pagesContentDir,
        files: context.templates.container,
        parentFolderName: page.name,
      })
    }),
  )
}

const recursiveCreateContainers = async ({
  containersToGen,
  outputPath,
  files,
  parentFolderName,
}) => {
  await Promise.all(
    containersToGen.map(async (container: ContainerProps) => {
      const { containerOutputPath } = await createContainers({
        name: container.name,
        outputPath,
        files,
        parentFolderName,
      })

      if (container?.containers?.length) {
        await recursiveCreateContainers({
          containersToGen: container.containers,
          parentFolderName: path.join(containerOutputPath, `${container.name}Ui`),
          files,
          outputPath,
        })
      }
    }),
  )
}

const createContainers = async ({ name, outputPath, files, parentFolderName }) => {
  const containerOutputPath = path.join(parentFolderName, 'containers', name)
  const outputPathFinal = path.join(outputPath, containerOutputPath).replaceAll(' ', '')

  await genCodeFromTemplate({
    name,
    files,
    outputPath: outputPathFinal,
    noParentFolder: true,
    slots: {
      localImports: 'hello local import',
    },
  })

  return { containerOutputPath }
}
