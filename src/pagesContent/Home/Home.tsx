import React from 'react'
import Box from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import Select from '@useweb/ui/Select'
import TextField from '@useweb/ui/Textfield'

export default function HomePageContent() {
  return (
    <Wrapper>
      <Form
        onSubmit={(dat) => {
          console.log({ dat })
        }}
      >
        <Select
          name='holla'
          label='label'
          options={[
            {
              label: 'asfadf',
              value: 'holllala',
            },
          ]}
        />
        <TextField name='name' />
      </Form>
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='HomePageContent' sx={{}}>
      {children}
    </Box>
  )
}
