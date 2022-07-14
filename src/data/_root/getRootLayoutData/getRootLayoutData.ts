import type NavLinkSchema from '../../_commonSchemas/NavLinkSchema'

type GetRootLayoutDataProps = {
  previewData?: any
}

export type GetRootLayoutDataReturn = GetRootLayoutDataProps & {
  pagesLinks: NavLinkSchema[]
  settings: any
}

export default async function getRootLayoutData({
  previewData = {},
}: GetRootLayoutDataProps = {}): Promise<GetRootLayoutDataReturn> {
  const pagesLinks: NavLinkSchema[] = []
  const settings = {}

  return { previewData, pagesLinks, settings }
}
