const files = [
  {
    path: ({ name }) => `${name}.tsx`,
    template: ({ name }) => `import React from 'react' 
    export default function ${name}Page() {
      return <>containers</>
    }`,
  },
  {
    path: () => 'routes.tsx',
    template: ({ name }) => `import React, { lazy } from 'react'
    import { Routes, Route } from 'react-router-dom'
    
    const ${name} = lazy(() => import('./'))

    export default function ${name}Routes() {
      return (
        <Routes>
          <Route path='/' element={<${name} />} />
        </Routes>
      )
    }`,
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
