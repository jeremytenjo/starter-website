import settingsStubs from '../../settings.stubs'
import type SettingsSchema from '../../settings.schema'
import getData from '../../../../lib/utils/data/getData/getData'

export default async function getSettings({ previewData = {} } = {}) {
  const getFn = () => getSettingsFromApi({ previewData })

  const settings: SettingsSchema[] = await getData({
    stubs: settingsStubs,
    getFn,
  })

  return settings
}

const getSettingsFromApi = async ({ previewData }) => {
  const settings: SettingsSchema[] = []
  // TODO get settings from api

  return settings
}
