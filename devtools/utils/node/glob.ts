import globLib, { type IOptions } from 'glob'

type GlobProps = {
  pattern: string
  options?: IOptions
}

type GlobReturn = string[]

/**
 * [Docs](https://github.com/isaacs/node-glob#usage)
 */
export default async function glob({
  pattern,
  options = {},
}: GlobProps): Promise<GlobReturn> {
  return new Promise(async (resolve, reject) => {
    globLib(pattern, options, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}
