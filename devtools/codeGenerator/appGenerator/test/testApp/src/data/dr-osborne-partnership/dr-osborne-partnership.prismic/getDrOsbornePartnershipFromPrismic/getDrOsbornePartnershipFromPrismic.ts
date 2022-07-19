import prismicClient from '../../../../lib/integrations/Prismic/utils/prismicClient/prismicClient'
      import type DrOsbornePartnershipPrismicSchema from '../dr-osborne-partnership.prismic.schema'
      import addSlugToData from '../../../../lib/integrations/Prismic/utils/addSlugToData/addSlugToData'

      export type GetDrOsbornePartnershipFromPrismicProps = any
      
      export default async function getDrOsbornePartnershipFromPrismic({ previewData = {} }: GetDrOsbornePartnershipFromPrismicProps = {}) {
        const dr-osborne-partnership: DrOsbornePartnershipPrismicSchema[] = (await prismicClient({
          previewData,
        }).getAllByType('dr-osborne-partnership')) as DrOsbornePartnershipPrismicSchema[]

        const dr-osborne-partnershipWithSlug = addSlugToData({ data: dr-osborne-partnership, slugKey: 'title' })
      
        return dr-osborne-partnershipWithSlug
      }
      