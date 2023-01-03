import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import Select from '@useweb/ui/Select'

export default {
  title: 'lib/components/useweb/Forms/Form',
  args: {},
}
export const Example = {
  render: () => {
    const onSubmit = (values) => {
      console.log(values)
    }

    const options = [
      {
        label: 'Season 1',
        value: 1,
      },
    ]
    return (
      <Form onSubmit={onSubmit}>
        <TextField name='test-textfield' />
        <Select label='Season' name='selected_season' options={options} />
      </Form>
    )
  },
}
