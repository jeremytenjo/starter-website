import React from 'react'

import IconTikTok from '../../icons/IconTikTok'
import IconInstagram from '../../icons/IconInstagram'
import IconYoutube from '../../icons/IconYoutube'
import IconPinterest from '../../icons/IconPinterest'

import SocialContactsUi, {
  type SocialContactsUiProps,
} from './SocialContactsUi/SocialContacts.ui'

export default function SocialContacts() {
  const accountLinks: SocialContactsUiProps['accountLinks'] = [
    {
      url: 'https://www.tiktok.com/@onlyfindz',
      icon: IconTikTok,
      hoverColor: '#39C6DD',
    },
    {
      url: 'https://www.instagram.com/onlyfindz',
      icon: IconInstagram,
      hoverColor: '#C72784',
    },
    {
      url: 'https://www.youtube.com/channel/UCKqNC6XNQVKmKOSHvJuQBEw/videos',
      icon: IconYoutube,
      hoverColor: '#FF0000',
    },
    {
      url: 'https://www.pinterest.ca/jerzaydt',
      icon: IconPinterest,
      hoverColor: '#E60023',
    },
  ]

  return <SocialContactsUi accountLinks={accountLinks} />
}
