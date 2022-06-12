import React from 'react'
import Form from '@useweb/form'
import Select from '@useweb/select'

export default {
  title: 'lib/components/Forms/Select',
  args: {
    options: [
      {
        label: 'Season 1',
        value: 1,
      },
    ],
  },
}

const Template = (args) => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Select {...args} />
    </Form>
  )
}

export const Example = Template.bind({}) as any
