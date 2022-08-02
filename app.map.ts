// open devtools/codeGenerator/appGenerator/test/testAppSchema.ts for an example
import superCodeGenSchema from './devtools/codeGenerator/superCodeGen.schema.cjs'
import {
  type MapProps,
  type ElementsTypes,
} from './devtools/codeGenerator/appGenerator/generateAppMap/generateAppMap'

const templates = {
  page: superCodeGenSchema.find((s) => s.type === 'Page')?.files || [],
  pageContent: superCodeGenSchema.find((s) => s.type === 'Page Content')?.files || [],
  container: superCodeGenSchema.find((s) => s.type === 'Container')?.files || [],
  component:
    superCodeGenSchema.find((s) => s.type === 'Component with story')?.files || [],
  data: superCodeGenSchema.find((s) => s.type === 'Data')?.files || [],
}

const pages = (): ElementsTypes['PagesProps']['pages'] => {
  return []
}

const components = (): ElementsTypes['ComponentsProps']['components'] => {
  return []
}

const data = (): ElementsTypes['DataProps']['data'] => {
  return []
}

export default async function appSchema() {
  const schema: MapProps = {
    templates,
    pages,
    data,
    components,
  }
  return schema
}
