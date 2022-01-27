const lodashMerge = require('lodash/merge')

/**
 * @example
 * deepMerge(defaultConfigOptions, config)
 */
module.exports = function deepMerge(defaultValues, newValues) {
  return lodashMerge(defaultValues, newValues)
}
