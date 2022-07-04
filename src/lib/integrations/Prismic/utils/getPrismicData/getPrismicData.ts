import prismicClient from '../prismicClient/prismicClient'

export type GetPrismicDataProps = { contentType: string }

export default async function getPrismicData({ contentType }: GetPrismicDataProps) {
  const previewData = {}
  const data = await prismicClient({
    previewData,
  }).getAllByType(contentType)

  return data
}
