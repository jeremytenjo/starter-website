type GetRootLayoutDataProps = {
  previewData?: any
}

export type GetRootLayoutDataReturn = any

export default async function getRootLayoutData({
  previewData = {},
}: GetRootLayoutDataProps = {}): Promise<GetRootLayoutDataReturn> {
  return { previewData }
}
