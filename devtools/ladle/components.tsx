import React from 'react'
import type { GlobalProvider } from '@ladle/react'

import Theme from '../../src/theme/theme'
import updateFavIcon from '../utils/images/updateFavIcon/updateFavIcon'

import './ladle.css'

updateFavIcon({ iconPath: 'images/logo/logo-storybook.svg' })

export const Provider: GlobalProvider = ({ children }) => {
  return <Theme>{children}</Theme>
}
