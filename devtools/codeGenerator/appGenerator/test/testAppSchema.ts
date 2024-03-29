import superCodeGenSchema from '../../superCodeGen.schema.cjs'
import { type MapProps } from '../generateAppMap/generateAppMap'
import { type ComponentsProps } from '../generateAppMap/handlers/handleComponents/handleComponents'
import { type DataProps } from '../generateAppMap/handlers/handleData/handleData'
import { type PagesProps } from '../generateAppMap/handlers/handlePages/handlePages'

const pages = (): PagesProps['pages'] => {
  return [
    {
      name: 'Home',
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
              containers: [{ name: 'Child of Reasons list' }],
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
      name: 'settings',
    },
    {
      name: 'Dr Osborne Partnership',
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
    { name: 'PublicHeader', folder: 'PrismicSlices' },
    { name: 'PublicFooter', folder: 'PrismicSlices' },
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
  ]
}

const data = (): DataProps['data'] => {
  return [
    {
      name: 'drOsbornePartnership',
    },
    {
      name: 'homepage',
    },
    {
      name: 'settings',
    },
    {
      name: 'gameCourses',
      components: [
        { name: 'GameCoursesPreviewList' },
        { name: 'GameCoursesList' },
        { name: 'GameCourseVideoPlayer' },
      ],
    },
  ]
}

const templates = {
  page: superCodeGenSchema.find((s) => s.type === 'Page')?.files || [],
  pageContent: superCodeGenSchema.find((s) => s.type === 'Page Content')?.files || [],
  container: superCodeGenSchema.find((s) => s.type === 'Container')?.files || [],
  component:
    superCodeGenSchema.find((s) => s.type === 'Component with story')?.files || [],
  data: superCodeGenSchema.find((s) => s.type === 'Data')?.files || [],
}

export default async function appSchema() {
  const schema: MapProps = {
    templates,
    pages,
    data,
    components,
  }

  return schema
}
