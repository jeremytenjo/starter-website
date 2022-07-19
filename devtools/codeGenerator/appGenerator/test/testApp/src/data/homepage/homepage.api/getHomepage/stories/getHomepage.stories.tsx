// https://storybook.js.org/docs/react/api/argtypes
      import React from 'react'
      import AsyncTester, {
        type AsyncTesterProps,
      } from '@useweb/async-tester'
      
      import getHomepage from '../getHomepage'
      
      export default {
        title: 'data/homepage',
        args: {
          autoExec: true,
        },
      }
      
      const Template = (args) => {
        return <AsyncTester {...args} />
      }

      // Homepage
      export const HomepageData = Template.bind({}) as any

      const HomepageArgs: AsyncTesterProps = {
        fn: getHomepage,
      }

      HomepageData.args = HomepageArgs
      