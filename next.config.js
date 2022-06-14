import withBundleAnalyzer from '@next/bundle-analyzer'
// https://github.com/martpie/next-transpile-modules
import ntm from 'next-transpile-modules'

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
        images: {
          domains: ['images.prismic.io'],
        },
      },
    }),
  )

  return nextConfig
}

const transpileESMNodeModules = ({ config }) => {
  const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
    it.includes('@useweb/'),
  )

  const withTM = ntm(transpiledPackages)

  return withTM(config)
}
