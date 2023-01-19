module.exports = function webpackFinal({ defaultWebpackConfig }) {
  const updatedConfig = defaultWebpackConfig
  // fixes Module parse failed: Unexpected character '�' - https://github.com/lovell/sharp/issues/2350
  // updatedConfig.externals = {}
  // updatedConfig.externals.sharp = 'commonjs sharp'
  // fixes Can't resolve 'fs'
  // updatedConfig.node = {}
  // updatedConfig.node.fs = 'empty'

  // fix next router NextRouter was not mounted error
  updatedConfig.resolve.alias = {
    ...updatedConfig.resolve.alias,
    'next/router': 'next-router-mock',
  }
  updatedConfig.resolve.fallback = {
    url: false,
    querystring: false,
    path: false,
    assert: false,
  }

  return updatedConfig
}
