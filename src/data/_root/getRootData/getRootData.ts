import type NavLinkSchema from '../../_commonSchemas/NavLinkSchema/NavLinkSchema'
import type SocialLinksSchema from '../../_commonSchemas/SocialLinkSchema/SocialLinkSchema'

type GetRootDataProps = {
  previewData?: any
}

export type GetRootDataReturn = GetRootDataProps & {
  navLinks: NavLinkSchema[]
  socialLinks: SocialLinksSchema[]
  globalSettings: any
}

export default async function getRootData({
  previewData = {},
}: GetRootDataProps = {}): Promise<GetRootDataReturn> {
  const globalSettings = {}
  const navLinks: NavLinkSchema[] = []
  const socialLinks: SocialLinksSchema[] = []

  return { previewData, globalSettings, navLinks, socialLinks }
}
