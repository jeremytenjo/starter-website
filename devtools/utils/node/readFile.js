import fs from 'fs'

export default async function readFile(pageDir, { encoding = 'utf8' } = {}) {
  const contents = await fs.readFileSync(pageDir, { encoding })
  return contents
}
