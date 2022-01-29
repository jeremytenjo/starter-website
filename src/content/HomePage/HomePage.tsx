import * as React from 'react'

import Intro from './containers/HomePageIntro/HomePageIntro'
import Projects from './containers/HomePageProjects/HomePageProjects'

export default function HomePageIndex() {
  return (
    <>
      <Intro />
      <Projects />
    </>
  )
}
