import React from 'react'
import Form from '@useweb/form'
import Select from '@useweb/select'
import Button from '@useweb/button'

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
      <Button type='submit' sx={{ mt: 3 }} name='submit'>
        Submit
      </Button>
    </Form>
  )
}

export const Example = Template.bind({}) as any
