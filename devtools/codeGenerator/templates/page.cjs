const files = [
  {
    path: () => `index.tsx`,
    template: ({ name, helpers }) => {
      const upperName = helpers.changeCase.capitalCase(name).split(' ').join('')

      return `import React from 'react' 
import Head from 'next/head'

import ${upperName}Content from '../../content/${upperName}/${upperName}'

    export default function ${upperName}Page() {
      return <>
       <Head>
         <title>Hayle Tenjo Recipes</title>
       </Head>
      
       <${upperName}Content />
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
