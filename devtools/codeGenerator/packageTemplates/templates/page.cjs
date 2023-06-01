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

import ${upperName}Content from '../../pagesContent/${upperName}/${upperName}'
import RootLayout from '../../lib/layouts/Root/RootLayout'

export default function ${upperName}Page() {
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
