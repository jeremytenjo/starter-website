const files = [
  {
    parentFolderName: ({ name, helpers }) => {
      const pascalName = helpers.changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: () => `index.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      const providerName = `${upperName}Provider`
      const propsName = `${helpers.changeCase.pascalCase(name).split(' ').join('')}Props`

      return `import React from 'react' 
import Head from 'next/head'

import ${upperName}Content from '../../pagesContent/${upperName}/${upperName}'
import { ${providerName} } from '../../pagesContent/${upperName}/use${upperName}Props/use${upperName}Props'
import getrootLayoutData from '../../data/_root/getRootData/getRootData'
import RootLayout, { type RootLayoutProps } from '../../lib/layouts/Root/RootLayout'

export type ${propsName} = {
  rootLayoutData: RootLayoutProps
}

export default function ${upperName}Page(props: ${propsName}) {
  return <>
   <Head>
     <title>${upperName}</title>
   </Head>
  
   <RootLayout rootLayoutData={props.rootLayoutData}>
    <${providerName} pageProps={props} >
      <${upperName}Content />
    </${providerName}>
   </RootLayout>

  </>
}

export async function getStaticProps({ params = {}, previewData }) {
  const rootLayoutData = await getrootLayoutData({ previewData })

  return {
    props: {
      rootLayoutData,
    },
  }
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
