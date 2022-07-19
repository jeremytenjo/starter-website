import prismicClient from '../../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
      import type SettingsPrismicSchema from '../settings.prismic.schema'
      import addSlugToData from '../../../../lib/integrations/Prismic/utils/addSlugToData/addSlugToData'

      export type GetSettingsFromPrismicProps = any
      
      export default async function getSettingsFromPrismic({ previewData = {} }: GetSettingsFromPrismicProps = {}) {
        const settings: SettingsPrismicSchema[] = (await prismicClient({
          previewData,
        }).getAllByType('settings')) as SettingsPrismicSchema[]

        const settingsWithSlug = addSlugToData({ data: settings, slugKey: 'title' })
      
        return settingsWithSlug
      }
      