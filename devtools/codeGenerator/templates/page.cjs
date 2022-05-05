const files = [
  {
    path: () => `index.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')
      const propsName = `${helpers.changeCase.capitalCase(name).split(' ').join('')}Props`
      const propsProviderName = `${upperName}PropsProvider`

      return `import React from 'react' 
import Head from 'next/head'

import ${upperName}Content from '../../content/${upperName}/${upperName}'
import { ${propsProviderName} } from '../content/${upperName}/use${upperName}Props/use${upperName}Props'

export type ${propsName} = {
  recipe: RecipeSchema
}

    export default function ${upperName}Page(props: ${propsName}) {
      return <>
       <Head>
         <title>${upperName}</title>
       </Head>
      
       <${propsProviderName} pageProps={props} >
        <${upperName}Content />
       </${propsProviderName}>
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
