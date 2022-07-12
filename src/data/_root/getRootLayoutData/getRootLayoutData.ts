export type GetRootLayoutDataProps = {
  previewData?: any
}

export type GetRootLayoutDataReturn = GetRootLayoutDataProps

export default async function getRootLayoutData({
  previewData = {},
}: GetRootLayoutDataProps = {}): Promise<GetRootLayoutDataReturn> {
  return { previewData }
}
