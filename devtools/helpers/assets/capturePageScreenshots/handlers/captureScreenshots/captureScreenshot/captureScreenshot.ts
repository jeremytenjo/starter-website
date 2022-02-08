export type CaptureScreenshotProps = {
  url: string
  path: string
  sizes: {
    width: number
    height: number
  }[]
}

export default async function captureScreenshot({
  url,
  path,
  sizes,
}: CaptureScreenshotProps) {
  console.log({ url, path, sizes })
  return 'hell'
}
