import testAppSchema from '../test/testAppSchema.js'

import handlePages, { type PagesProps } from './handlers/handlePages/handlePages.js'
import handleData, { type DataProps } from './handlers/handleData/handleData.js'
import handleComponents, {
  type ComponentsProps,
} from './handlers/handleComponents/handleComponents.js'

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
}

export default async function generateApp() {
  const {
    templates,
    pages = () => [],
    data = () => [],
    components = () => [],
  }: SchemaProps = await testAppSchema()

  const context: ContextProps = {
    templates,
    rootDir: process.cwd(),
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
