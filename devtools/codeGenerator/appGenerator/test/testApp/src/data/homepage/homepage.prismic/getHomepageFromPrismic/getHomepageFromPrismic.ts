import prismicClient from '../../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
      import type HomepagePrismicSchema from '../homepage.prismic.schema'
      import addSlugToData from '../../../../lib/integrations/Prismic/utils/addSlugToData/addSlugToData'

      export type GetHomepageFromPrismicProps = any
      
      export default async function getHomepageFromPrismic({ previewData = {} }: GetHomepageFromPrismicProps = {}) {
        const homepage: HomepagePrismicSchema[] = (await prismicClient({
          previewData,
        }).getAllByType('homepage')) as HomepagePrismicSchema[]

        const homepageWithSlug = addSlugToData({ data: homepage, slugKey: 'title' })
      
        return homepageWithSlug
      }
      