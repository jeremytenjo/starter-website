import React from 'react'
import Form from '@useweb/ui/Form'
import Textfield from '@useweb/ui/Textfield'
import Select from '@useweb/ui/Select'

export default {
  title: 'lib/components/Forms/Form',
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
        <Textfield name='test-textfield' />
        <Select label='Season' name='selected_season' options={options} />
      </Form>
    )
  },
}
