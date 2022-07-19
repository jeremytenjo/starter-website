import drOsbornePartnershipStubs from '../../dr-osborne-partnership.stubs'
import type DrOsbornePartnershipSchema from '../../dr-osborne-partnership.schema'
import getData from '../../../../lib/utils/data/getData/getData'

export default async function getDrOsbornePartnership({ previewData = {} } = {}) {
  const getFn = () => getDrOsbornePartnershipFromApi({ previewData })

  const drOsbornePartnership: DrOsbornePartnershipSchema[] = await getData({
    stubs: drOsbornePartnershipStubs,
    getFn,
  })

  return drOsbornePartnership
}

const getDrOsbornePartnershipFromApi = async ({ previewData }) => {
  const drOsbornePartnership: DrOsbornePartnershipSchema[] = []
  // TODO get drOsbornePartnership from api

  return drOsbornePartnership
}
