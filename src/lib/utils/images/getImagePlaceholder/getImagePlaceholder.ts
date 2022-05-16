import { getPlaiceholder, type IGetPlaiceholderReturn } from 'plaiceholder'

type GetImagePlaceholderProps = { imageUrl: string }

export default async function getImagePlaceholder({
  imageUrl,
}: GetImagePlaceholderProps): Promise<IGetPlaiceholderReturn> {
  const isSupported =
    imageUrl.includes('jpeg') || imageUrl.includes('png') || imageUrl.includes('jpg')
  let imagePlaceholder = {
    base64: '',
    blurhash: '',
    css: '',
    svg: '',
  } as any

  if (isSupported) {
    imagePlaceholder = await getPlaiceholder(imageUrl)
  }

  return imagePlaceholder
}
