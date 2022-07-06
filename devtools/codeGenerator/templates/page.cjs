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

export type ${propsName} = {
  data: any[]
}

export default function ${upperName}Page(props: ${propsName}) {
  return <>
   <Head>
     <title>${upperName}</title>
   </Head>
  
   <${propsProviderName} pageProps={props} >
    <${contentPageName}Content />
   </${propsProviderName}>
  </>
}

export async function getStaticProps({ previewData }) {
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
