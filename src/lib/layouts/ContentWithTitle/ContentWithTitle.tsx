import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type ContentWithTitleProps = {
  sx?: object
  title?: string
  titleSx?: object
  content: any
}

export default function ContentWithTitle(props: ContentWithTitleProps) {
  return (
    <Wrapper {...props}>
      {props.title && (
        <Text
          text={props.title}
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            mb: '25px',
            ...(props.titleSx || {}),
          }}
        />
      )}
      {props.content}
    </Wrapper>
  )
}

const Wrapper = ({ children, sx = {} }) => {
  return (
    <Box data-id='ContentWithTitle' sx={sx}>
      {children}
    </Box>
  )
}
