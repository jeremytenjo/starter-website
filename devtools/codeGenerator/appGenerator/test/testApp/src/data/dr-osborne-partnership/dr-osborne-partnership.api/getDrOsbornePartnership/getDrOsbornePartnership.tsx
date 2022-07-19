
      import dr-osborne-partnershipStubs from '../../dr-osborne-partnership.stubs'
      import type DrOsbornePartnershipSchema from '../../dr-osborne-partnership.schema'
      import getData from '../../../../lib/utils/data/getData/getData'
      
      export default async function getDrOsbornePartnership({ previewData = {} } = {}) {
        const getFn = () => getDrOsbornePartnershipFromApi({previewData})

        const dr-osborne-partnership: DrOsbornePartnershipSchema[] = await getData({
          stubs: dr-osborne-partnershipStubs,
          getFn,
        })
      
        return dr-osborne-partnership
      }
      
      const getDrOsbornePartnershipFromApi = async ({previewData}) => {
        const dr-osborne-partnership: DrOsbornePartnershipSchema[] = []
        // TODO get dr-osborne-partnership from api
      
        return dr-osborne-partnership
      }
      

      