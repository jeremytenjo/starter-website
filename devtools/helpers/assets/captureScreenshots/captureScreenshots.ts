import log from '../../../utils/node/log.js'

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
  pathPrefix?: CaptureScreenshotProps['pathPrefix']
}

export default async function captureScreenshots({
  urlPrefix,
  list,
  pathPrefix,
}: CaptureScreenshotsProps) {
  const { spinner } = log('Capturing screenshots', { loading: true })

  try {
    await Promise.all(
      list.map(async (item) => {
        const { spinner: itemSpinner } = log(`Capturing ${item.path}`, { loading: true })

        await captureScreenshot({
          pathPrefix,
          url: `${urlPrefix}/${item.url}`,
          path: item.path,
          sizes: item.sizes,
        })

        return itemSpinner.succeed(`Captured ${item.path}`)
      }),
    )

    spinner.succeed('Screenshots captured')
    process.exit(0)
  } catch (error: any) {
    log(error, { error: true })
  }
}
