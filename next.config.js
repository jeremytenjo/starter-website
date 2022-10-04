import withBundleAnalyzer from '@next/bundle-analyzer'
// https://github.com/martpie/next-transpile-modules
import ntm from 'next-transpile-modules'

import appConfig from './app.config.js'
import packageJSON from './package.json' assert { type: 'json' }

const withBundleAnalyzerFn = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default async () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = withBundleAnalyzerFn(
    transpileESMNodeModules({
      config: {
        env: {
          nextjsPort: String(appConfig.nextjs.port),
        },
        images: {
          allowFutureImage: true,
          domains: ['images.prismic.io'],
        },
      },
    }),
  )

  return nextConfig
}

// Needed in order to import ES Modules from node_modules.
// Nextjs has an open RFC to support this feature https://github.com/vercel/next.js/discussions/27953
const transpileESMNodeModules = ({ config }) => {
  const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
    it.includes('@useweb/'),
  )

  const withTM = ntm(transpiledPackages)

  return withTM(config)
}
