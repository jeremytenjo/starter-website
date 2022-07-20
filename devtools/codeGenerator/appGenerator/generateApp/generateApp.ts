import path from 'path'

import removeFolder from '../../../utils/node/removeFolder.js'

import handlePages, { type PagesProps } from './handlers/handlePages/handlePages.js'
import handleData, { type DataProps } from './handlers/handleData/handleData.js'
import handleComponents, {
  type ComponentsProps,
} from './handlers/handleComponents/handleComponents.js'

export type ElementsTypes = {
  PagesProps: PagesProps
  DataProps: DataProps
  ComponentsProps: ComponentsProps
}

export type SchemaProps = {
  templates: {
    page: any
    pageContent: any
    container: any
    component: any
    data: any
  }
  pages?: () => PagesProps['pages'] | Promise<PagesProps['pages']>
  data?: () => DataProps['data'] | Promise<DataProps['data']>
  components?: () =>
    | ComponentsProps['components']
    | Promise<ComponentsProps['components']>
}

export type ContextProps = {
  templates: SchemaProps['templates']
  rootDir: string
  isTestEnv: boolean
}

export default async function generateApp() {
  const isTestEnv = process.env.NODE_ENV === 'test'
  const appSchema = isTestEnv
    ? (await import('../test/testAppSchema.js')).default
    : (await import('../../../../app.schema.js')).default

  if (isTestEnv) {
    await removeFolder(path.join(process.cwd(), 'src'))
  }

  const {
    templates,
    pages = () => [],
    data = () => [],
    components = () => [],
  }: SchemaProps = await appSchema()

  if (!pages.length && !data.length && !components.length) {
    console.log('No pages, data or components to generate')
    console.log('')
    return
  }

  const context: ContextProps = {
    templates,
    rootDir: process.cwd(),
    isTestEnv,
  }

  try {
    await handlePages({ pages: await pages(), context })
    await handleData({ data: await data(), context })
    await handleComponents({ components: await components(), context })

    console.log('')
    console.log(`🚀  App Generated`)
    console.log('')
  } catch (error) {
    console.log(error)
  }
}
