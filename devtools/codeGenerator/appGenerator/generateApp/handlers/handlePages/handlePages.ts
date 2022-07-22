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
  if (!pages.length) return { noPages: true }

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
        slots: getPageContainerSlots({ pageContentContainers: page.containers }),
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

const getPageContainerSlots = ({ pageContentContainers }) => {
  if (!pageContentContainers && !pageContentContainers?.length) {
    return undefined
  }
  const slots = getSlots({ childContainers: pageContentContainers } as any)
  return slots
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
    slots = getSlots({
      childContainers: localContainers,
      localComponents,
      parentName: name,
    })
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

const getSlots = ({ childContainers = [], localComponents = [], parentName }) => {
  // create inner containers slots
  let localImports = ''
  let localImportedComponents = ''

  childContainers.map((container: { name: string }) => {
    const componentName = changeCase.pascalCase(container.name)

    localImports += `import ${componentName} from './containers/${componentName}/${componentName}' \n`
    localImportedComponents += `<${componentName} /> \n`
  })

  // create local component slots
  let localComponentsString = ''
  let localComponentsDeclarationsString = ''

  localComponents.map((component: { name: string }) => {
    const componentName = changeCase.pascalCase(component.name).replaceAll(' ', '')

    localComponentsDeclarationsString += `<${componentName} {...props} /> \n`
    localComponentsString += `const ${componentName} = (props: ${parentName}UiProps) => {
      return (
        <Box data-id='${componentName}' sx={{}}>
        ${componentName}
        </Box>
        )
      } \n \n`
  })

  const slots: any = {
    childContainers: {
      importStatements: localImports,
      importedComponents: localImportedComponents,
    },
    localComponents: {
      localComponentsDeclarations: localComponentsDeclarationsString,
      localComponents: localComponentsString,
    },
  }

  if (!childContainers.length) delete slots.childContainers
  if (!localComponents.length) delete slots.localComponents

  return slots
}
