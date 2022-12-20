import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type ContentWithHeaderProps = {
  sx?: object
  title?: string
  titleTag?: string
  titleSx?: BoxProps['sx']
  headerSx?: BoxProps['sx']
  content: any
  titleActions?: any
}

export default function ContentWithHeader(props: ContentWithHeaderProps) {
  return (
    <Wrapper {...props}>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '25px',
          ...(props.headerSx || {}),
        }}
      >
        {props.title && (
          <Text
            text={props.title}
            tag={props.titleTag || 'h3'}
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
    <Box data-id='ContentWithHeader' sx={{ ...sx }}>
      {children}
    </Box>
  )
}
