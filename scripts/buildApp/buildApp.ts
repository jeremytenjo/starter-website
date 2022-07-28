import shell from '../../devtools/utils/node/shell.js'

export default function buildApp() {
  let commands = `node --experimental-json-modules node_modules/.bin/next build`

  if (process.env.COMMIT_SITEMAP) {
    commands = `${commands} && npm run helpers:generate-sitemap && git add public/sitemap.xml && git commit -m "updated sitemap"`
  }

  shell(commands)
}
