const dotenv = require('dotenv')
const dotenvParseVariables = require('dotenv-parse-variables')

const doesFolderOrFileExist = require('./doesFolderOrFileExist.cjs')

module.exports = function parseEnvFile({ envFilePath }) {
  const doesEnvFileExists = doesFolderOrFileExist(envFilePath)
  if (!doesEnvFileExists) return {}

  const env = dotenv.config({ path: envFilePath })

  if (env.error) throw env.error

  const parsedEnvFile = dotenvParseVariables(env.parsed)

  return parsedEnvFile
}
