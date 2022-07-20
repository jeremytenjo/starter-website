import path from 'path'

import changeCase from 'change-case'

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
        localContainers: container.containers,
        localComponents: container.localComponents,
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

const createContainers = async ({
  name,
  outputPath,
  files,
  parentFolderName,
  localContainers,
  localComponents,
}) => {
  let slots = {}
  const containerOutputPath = path.join(parentFolderName, 'containers', name)
  const outputPathFinal = path.join(outputPath, containerOutputPath).replaceAll(' ', '')

  if (localContainers || localComponents) {
    slots = getSlots({ containers: localContainers, localComponents })
  }

  await genCodeFromTemplate({
    name,
    files,
    outputPath: outputPathFinal,
    noParentFolder: true,
    slots,
  })

  return { containerOutputPath }
}

const getSlots = ({ containers = [], localComponents = [] }) => {
  // create inner containers slots
  let localImports = ''
  let localImportedComponents = ''

  containers.map((container: { name: string }) => {
    const componentName = changeCase.pascalCase(container.name)

    localImports += `import ${componentName} from './containers/${componentName}/${componentName}' \n`
    localImportedComponents += `<${componentName} /> \n`
  })

  // create local component slots
  let localComponentsString = ''
  let localComponentsDeclarationsString = ''

  localComponents.map((component: { name: string }) => {
    const componentName = changeCase.pascalCase(component.name)

    localComponentsString += `import ${componentName} from './containers/${componentName}/${componentName}' \n`
    localComponentsDeclarationsString += `<${componentName} /> \n`
  })

  const slots = {
    childContainers: {
      importStatements: localImports,
      importedComponents: localImportedComponents,
    },
    localComponents: {
      localComponents: localComponentsString,
      localComponentsDeclarations: localComponentsDeclarationsString,
    },
  }

  return slots
}
