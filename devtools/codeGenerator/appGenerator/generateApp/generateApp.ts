import testAppSchema from '../test/testAppSchema.js'

import handlePages, { type PagesProps } from './handlers/handlePages/handlePages.js'
import handleData, { type DataProps } from './handlers/handleData/handleData.js'
import handleComponents, {
  type ComponentsProps,
} from './handlers/handleComponents/handleComponents.js'

export type SchemaProps = {
  pages?: () => PagesProps['pages'] | Promise<PagesProps['pages']>
  data?: () => DataProps['data'] | Promise<DataProps['data']>
  components?: () =>
    | ComponentsProps['components']
    | Promise<ComponentsProps['components']>
}

export type ContextProps = {
  rootDir: string
}

export default async function generateApp() {
  const {
    pages = () => [],
    data = () => [],
    components = () => [],
  }: SchemaProps = await testAppSchema()

  const context: ContextProps = {
    rootDir: process.cwd(),
  }

  await handlePages({ pages: await pages(), context })
  await handleData({ data: await data(), context })
  await handleComponents({ components: await components(), context })
}
