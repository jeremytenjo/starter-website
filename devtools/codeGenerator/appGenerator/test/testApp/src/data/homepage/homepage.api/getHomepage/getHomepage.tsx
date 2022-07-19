import homepageStubs from '../../homepage.stubs'
import type HomepageSchema from '../../homepage.schema'
import getData from '../../../../lib/utils/data/getData/getData'

export default async function getHomepage({ previewData = {} } = {}) {
  const getFn = () => getHomepageFromApi({ previewData })

  const homepage: HomepageSchema[] = await getData({
    stubs: homepageStubs,
    getFn,
  })

  return homepage
}

const getHomepageFromApi = async ({ previewData }) => {
  const homepage: HomepageSchema[] = []
  // TODO get homepage from api

  return homepage
}
