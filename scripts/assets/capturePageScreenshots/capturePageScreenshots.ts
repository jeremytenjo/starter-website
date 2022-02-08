import path from 'path'

import captureScreenshots from '../../../devtools/helpers/assets/captureScreenshots/captureScreenshots.js'

export default function capturePageScreenshots() {
  const mobileSize = {
    width: 400,
    height: 800,
  }

  const urlPrefix = 'http://localhost:3000'
  const pathPrefix = path.join(process.cwd(), 'public/images/screenshots/pages')
  const list = [
    {
      url: '/',
      path: 'home',
      sizes: [mobileSize],
    },
  ]

  captureScreenshots({
    urlPrefix,
    list,
    pathPrefix,
  })
}
