import { type GetRootDataReturn } from '../getRootData/getRootData'
import navLinksStubs from '../../_commonSchemas/NavLinkSchema/navLinks.stubs'
import socialLinksStubs from '../../_commonSchemas/SocialLinkSchema/socialLinks.stubs'

export default function getRootDataStubs(): GetRootDataReturn {
  const data: GetRootDataReturn = {
    globalSettings: {},
    navLinks: navLinksStubs,
    socialLinks: socialLinksStubs,
  }

  return data
}
