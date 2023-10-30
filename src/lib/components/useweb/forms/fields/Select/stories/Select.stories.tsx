//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'
import Form from '@useweb/ui/Form'
import Button from '@mui/material/Button'
import Select, { type SelectProps } from '@useweb/ui/Select'

const defaultArgs: SelectProps<any, any> = {
  name: 'season',
  label: 'Season',
  options: [
    {
      label: 'Season 1',
      value: 1,
    },
    {
      label: 'Season 2',
      value: 2,
    },
  ],
}

export default {
  title: 'lib/components/useweb/forms/Select',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Template = (args) => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <Form onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
        <Select {...args} />
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export const Default = {
  render: (args) => {
    return <Template {...args} />
  },
}

// const variantArgs: SelectProps = {
//  name: 'World',
// }

// export const Variant = {
//  ...Default,
//  args: variantArgs
// }
