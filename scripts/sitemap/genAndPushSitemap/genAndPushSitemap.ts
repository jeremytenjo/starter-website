import shell from '../../../devtools/utils/node/shell.js'

export default async function genAndPushSitemap() {
  shell(
    'npm run helpers:generate-sitemap && git add public/sitemap.xml && git commit -m "updated sitemap" && git push --no-verify',
  )
}
