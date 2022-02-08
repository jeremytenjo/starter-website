import nodePath from 'path'

import captureWebsite from 'capture-website'

import createFolder from '../../../../utils/node/createFolder.js'

export type CaptureScreenshotProps = {
  url: string
  path: string
  sizes: {
    width: number
    height: number
  }[]
  pathPrefix?: string
}

export default async function captureScreenshot({
  url,
  path,
  sizes,
  pathPrefix,
}: CaptureScreenshotProps) {
  return await Promise.all(
    sizes.map(
      async (size) =>
        await capture({ url, path, pathPrefix, width: size.width, height: size.height }),
    ),
  )
}

const capture = async ({ url, path, width, height, pathPrefix }) => {
  await createFolder({ paths: [pathPrefix] })

  return await captureWebsite.file(
    url,
    nodePath.join(pathPrefix, `${path}_${width}x${height}.png`),
    {
      width,
      height,
    },
  )
}
