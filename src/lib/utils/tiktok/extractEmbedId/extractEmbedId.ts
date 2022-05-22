type ExtractEmbedIdProps = { tiktokEmbedCode: string | null }

export default function extractEmbedId({ tiktokEmbedCode = '' }: ExtractEmbedIdProps) {
  let embedId = false as any

  if (tiktokEmbedCode) {
    embedId = tiktokEmbedCode.match(/cite="(.*?)"/g)?.[0]

    if (embedId) {
      embedId = embedId.replace(`cite=\"`, '')
      embedId = embedId.replace(`\"`, '')
    }
  }

  return embedId
}
