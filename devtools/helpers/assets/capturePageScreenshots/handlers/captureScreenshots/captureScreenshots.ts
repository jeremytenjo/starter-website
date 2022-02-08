import log from '../../../../../utils/node/log.js'

import captureScreenshot, {
  type CaptureScreenshotProps,
} from './captureScreenshot/captureScreenshot.js'

type CaptureScreenshotsProps = {
  urlPrefix: string
  list: {
    url: string
    path: string
    sizes: CaptureScreenshotProps['sizes']
  }[]
}

export default async function captureScreenshots({
  urlPrefix,
  list,
}: CaptureScreenshotsProps) {
  const { spinner } = log('Capturing screenshots', { loading: true })

  await Promise.all(
    list.map(
      async (item) =>
        await captureScreenshot({
          url: `${urlPrefix}/${item.url}`,
          path: item.path,
          sizes: item.sizes,
        }),
    ),
  )

  spinner.succeed('Screenshots captured successfully')
}
