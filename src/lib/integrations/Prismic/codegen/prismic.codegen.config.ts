import type { Config } from 'prismic-ts-codegen'

const config: Config = {
  output: './src/lib/integrations/Prismic/codegen/prismic.codegen.types.ts',
  models: ['./customtypes/**/index.json', './slices/**/model.json'],
}

export default config
