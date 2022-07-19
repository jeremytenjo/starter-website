import React from 'react'

import HeroUi, { type HeroUiProps } from './HeroUi/Hero.ui'

export default function Hero() {
  const uiProps: HeroUiProps = {
    title: 'Hero',
  }

  return <HeroUi {...uiProps} />
}
