// https://storybook.js.org/docs/react/api/argtypes
      import React from 'react'
      import AsyncTester, {
        type AsyncTesterProps,
      } from '@useweb/async-tester'
      
      import getSettings from '../getSettings'
      
      export default {
        title: 'data/settings',
        args: {
          autoExec: true,
        },
      }
      
      const Template = (args) => {
        return <AsyncTester {...args} />
      }

      // Settings
      export const SettingsData = Template.bind({}) as any

      const SettingsArgs: AsyncTesterProps = {
        fn: getSettings,
      }

      SettingsData.args = SettingsArgs
      