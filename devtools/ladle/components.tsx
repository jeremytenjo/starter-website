import React from 'react'

import Theme from '../../src/theme/theme'
import updateFavIcon from '../utils/images/updateFavIcon/updateFavIcon'

import './ladle.css'

updateFavIcon({ iconPath: 'images/logo/logo-storybook.svg' })

export const Provider = ({ children }) => {
  return <Theme>{children}</Theme>
}
