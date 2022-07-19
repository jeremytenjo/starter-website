import { type SchemaProps } from '../generateApp/generateApp'
import { type ComponentsProps } from '../generateApp/handlers/handleComponents/handleComponents'
import { type DataProps } from '../generateApp/handlers/handleData/handleData'
import { type PagesProps } from '../generateApp/handlers/handlePages/handlePages'

const pages = (): PagesProps['pages'] => {
  return [
    {
      name: 'home',
      path: '/',
      containers: [
        {
          name: 'Hero',
          libComponents: [
            {
              name: 'Hero',
            },
          ],
        },

        {
          name: 'Why Choose Water Supply',
          containers: [
            {
              name: 'Description',
            },
            {
              name: 'Reasons List',
            },
          ],
        },
        {
          name: 'Certificates',
          localComponents: [{ name: 'Certificates List' }],
        },
      ],
    },
    {
      name: 'dr-osborne-partnership',
      path: 'dr-osborne-partnership',
      containers: [
        {
          name: 'Hero',
          libComponents: [
            {
              name: 'Hero',
            },
          ],
        },
        {
          name: 'Quote',
        },
        {
          name: 'Bio',
        },
      ],
    },
  ]
}

const components = (): ComponentsProps['components'] => {
  return [
    {
      name: 'Footer',
      localComponents: [
        {
          name: 'ContactUsForm',
        },
        {
          name: 'Copyright',
        },
        {
          name: 'Info',
          localComponents: [
            {
              name: 'CallUs',
            },
            {
              name: 'ContactArea',
            },
            {
              name: 'OtherInfo',
            },
          ],
        },
      ],
    },
    {
      name: 'Header',
      localComponents: [
        {
          name: 'DesktopHeader',
          localComponents: [
            {
              name: 'Top Level',
              localComponents: [
                {
                  name: 'Contact',
                },
                {
                  name: 'Logo',
                },
              ],
            },
            {
              name: 'Bottom Level',
              localComponents: [
                {
                  name: 'ContactUs',
                },
                {
                  name: 'PageLinks',
                },
              ],
            },
          ],
        },
        {
          name: 'MobileHeader',
          localComponents: [
            {
              name: 'Logo',
            },
            {
              name: 'Menu',
            },
          ],
        },
      ],
    },
    {
      name: 'ContactBlock',
    },
    {
      name: 'ContactForm',
    },
    {
      name: 'ContactUsButton',
    },
    {
      name: 'PhoneNumberLink',
    },
    {
      name: 'SiteLogo',
    },
  ]
}

const data = (): DataProps['data'] => {
  return [
    {
      name: 'dr-osborne-partnership',
    },
    {
      name: 'homepage',
    },
    {
      name: 'settings',
    },
  ]
}

export default async function appSchema() {
  const schema: SchemaProps = {
    pages,
    data,
    components,
  }

  return schema
}
