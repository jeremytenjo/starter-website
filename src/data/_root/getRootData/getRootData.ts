import type NavLinkSchema from '../../_commonSchemas/NavLinkSchema/NavLinkSchema'
import type SocialLinkSchema from '../../_commonSchemas/SocialLinkSchema/SocialLinkSchema'

type GetRootDataProps = {
  previewData: any
}

export type GetRootDataReturn = GetRootDataProps & {
  globalSettings: any
  navLinks: NavLinkSchema[]
  socialLinks: SocialLinkSchema[]
}

export default async function getRootData(
  { previewData = {} }: GetRootDataProps = { previewData: undefined },
): Promise<GetRootDataReturn> {
  const rootData: GetRootDataReturn = {
    previewData,
    globalSettings: {},
    navLinks: [],
    socialLinks: [],
  }

  return rootData
}
