const files = [
  {
    path: () => `index.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      const contentPageName = `${upperName}Page`
      const propsProviderName = `${contentPageName}PropsProvider`
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`

      return `import React from 'react' 
import Head from 'next/head'

import ${contentPageName}Content from '../../content/${contentPageName}/${contentPageName}'
import { ${propsProviderName} } from '../../content/${contentPageName}/use${contentPageName}Props/use${contentPageName}Props'
import getrootLayoutData from '../data/_root/getRootLayoutData/getRootLayoutData'
import RootLayout, { type RootLayoutProps } from '../lib/layouts/Root/RootLayout'

export type ${propsName} = {
  rootLayoutData: RootLayoutProps
}

export default function ${upperName}Page(props: ${propsName}) {
  return <>
   <Head>
     <title>${upperName}</title>
   </Head>
  
   <RootLayout {...props.rootLayoutData}>
    <${propsProviderName} pageProps={props} >
      <${contentPageName}Content />
    </${propsProviderName}>
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
