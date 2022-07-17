import type NavLinkSchema from '../../_commonSchemas/NavLinkSchema'

type GetRootDataProps = {
  previewData?: any
}

export type GetRootDataReturn = GetRootDataProps & {
  pagesLinks: NavLinkSchema[]
  settings: any
}

export default async function getRootData({
  previewData = {},
}: GetRootDataProps = {}): Promise<GetRootDataReturn> {
  const pagesLinks: NavLinkSchema[] = []
  const settings = {}

  return { previewData, pagesLinks, settings }
}
