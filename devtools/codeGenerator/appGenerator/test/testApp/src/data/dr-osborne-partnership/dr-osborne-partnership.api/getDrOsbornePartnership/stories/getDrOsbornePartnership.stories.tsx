// https://storybook.js.org/docs/react/api/argtypes
      import React from 'react'
      import AsyncTester, {
        type AsyncTesterProps,
      } from '@useweb/async-tester'
      
      import getDrOsbornePartnership from '../getDrOsbornePartnership'
      
      export default {
        title: 'data/dr-osborne-partnership',
        args: {
          autoExec: true,
        },
      }
      
      const Template = (args) => {
        return <AsyncTester {...args} />
      }

      // DrOsbornePartnership
      export const DrOsbornePartnershipData = Template.bind({}) as any

      const DrOsbornePartnershipArgs: AsyncTesterProps = {
        fn: getDrOsbornePartnership,
      }

      DrOsbornePartnershipData.args = DrOsbornePartnershipArgs
      