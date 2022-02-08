import captureScreenshots from './handlers/captureScreenshots/captureScreenshots.js'

export default function capturePageScreenshots() {
  const mobileSize = {
    width: 400,
    height: 800,
  }

  const urlPrefix = 'http://localhost:3000'
  const list = [
    {
      url: '/',
      // names are prefixed with `screenshot-{name}`
      path: 'home',
      sizes: [mobileSize],
    },
  ]

  captureScreenshots({
    urlPrefix,
    list,
  })
}
