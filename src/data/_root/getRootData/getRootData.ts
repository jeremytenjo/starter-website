import type NavLinkSchema from '../../_commonSchemas/NavLinkSchema/NavLinkSchema'
import type SocialLinkSchema from '../../_commonSchemas/SocialLinkSchema/SocialLinkSchema'

type GetRootDataProps = {
  previewData?: any
}

export type GetRootDataReturn = GetRootDataProps & {
  navLinks: NavLinkSchema[]
  socialLinks: SocialLinkSchema[]
  globalSettings: any
}

export default async function getRootData({
  previewData = {},
}: GetRootDataProps = {}): Promise<GetRootDataReturn> {
  const rootData: GetRootDataReturn = {
    previewData,
    globalSettings: {},
    navLinks: [],
    socialLinks: [],
  }

  return rootData
}
