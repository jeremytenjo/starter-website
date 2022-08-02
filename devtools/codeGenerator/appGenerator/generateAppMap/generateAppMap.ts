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

export type MapProps = {
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
  templates: MapProps['templates']
  rootDir: string
  isTestEnv: boolean
}

export default async function generateAppMap() {
  const isTestEnv = process.env.NODE_ENV === 'test'
  const appMap = isTestEnv
    ? (await import('../test/testAppSchema.js')).default
    : (await import('../../../../app.map.js')).default

  if (isTestEnv) {
    await removeFolder(path.join(process.cwd(), 'src'))
  }

  const {
    templates,
    pages = () => [],
    data = () => [],
    components = () => [],
  }: MapProps = await appMap()

  const context: ContextProps = {
    templates,
    rootDir: process.cwd(),
    isTestEnv,
  }

  try {
    const pagesRes = await handlePages({ pages: await pages(), context })
    const dataRes = await handleData({ data: await data(), context })
    const componentsRes = await handleComponents({
      components: await components(),
      context,
    })

    if (pagesRes?.noPages && dataRes?.noData && componentsRes?.noComponents) {
      console.log('No pages, data or components to generate')
      console.log('')
    } else {
      console.log('')
      console.log(`🚀  App Generated`)
      console.log('')
    }
  } catch (error) {
    console.log(error)
  }
}
