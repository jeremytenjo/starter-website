const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.paramCase(name).split(' ').join('-')
      return pascalName
    },
    path: () => `index.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `import React from 'react' 
import Head from 'next/head'

import ${upperName}Content from '../../pagesContent/${upperName}/${upperName}.js'
import RootLayout from '../../lib/layouts/Root/RootLayout.js'

export default function ${upperName}PageRoot() {
  return <>
   <Head>
     <title>${upperName}</title>
   </Head>
  
   <RootLayout>
      <${upperName}Content />
   </RootLayout>
  </>
}`
    },
  },
]

const template = {
  type: 'Page',
  files,
}

module.exports = {
  files,
  template,
}
