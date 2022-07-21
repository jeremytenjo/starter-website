import shell from '../../devtools/utils/node/shell.js'

export default function buildApp() {
  let commands = `node --experimental-json-modules node_modules/.bin/next build && node node_modules/.bin/next-sitemap --config next-sitemap.cjs`

  if (process.env.NODE_GIT_STAGE === 'prepush') {
    commands = commands.replace(
      '&& node node_modules/.bin/next-sitemap --config next-sitemap.cjs',
      '',
    )
  }

  shell(commands)
}
