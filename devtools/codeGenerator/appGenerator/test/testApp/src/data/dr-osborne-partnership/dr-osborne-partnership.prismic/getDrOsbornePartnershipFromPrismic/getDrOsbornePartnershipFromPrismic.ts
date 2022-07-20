import prismicClient from '../../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
      import type DrOsbornePartnershipPrismicSchema from '../dr-osborne-partnership.prismic.schema'
      import addSlugToData from '../../../../lib/integrations/Prismic/utils/addSlugToData/addSlugToData'

      export type GetDrOsbornePartnershipFromPrismicProps = any
      
      export default async function getDrOsbornePartnershipFromPrismic({ previewData = {} }: GetDrOsbornePartnershipFromPrismicProps = {}) {
        const drOsbornePartnership: DrOsbornePartnershipPrismicSchema[] = (await prismicClient({
          previewData,
        }).getAllByType('dr-osborne-partnership')) as DrOsbornePartnershipPrismicSchema[]

        const drOsbornePartnershipWithSlug = addSlugToData({ data: drOsbornePartnership, slugKey: 'title' })
      
        return drOsbornePartnershipWithSlug
      }
      