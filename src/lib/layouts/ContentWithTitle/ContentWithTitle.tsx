import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type ContentWithTitleProps = {
  sx?: object
  title?: string
  titleTag?: string
  titleSx?: BoxProps['sx']
  content: any
  titleActions?: any
}

export default function ContentWithTitle(props: ContentWithTitleProps) {
  return (
    <Wrapper {...props}>
      <Box
        sx={{
          mb: '25px',
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {props.title && (
          <Text
            text={props.title}
            tag={props.titleTag || 'p'}
            sx={{
              fontWeight: 'bold',
              fontSize: {
                xs: '16px',
                md: '18px',
              },
              ...(props.titleSx || {}),
            }}
          />
        )}

        {props.titleActions || null}
      </Box>

      {props.content}
    </Wrapper>
  )
}

const Wrapper = ({ children, sx = {} }) => {
  return (
    <Box data-id='ContentWithTitle' sx={{ ...sx }}>
      {children}
    </Box>
  )
}
