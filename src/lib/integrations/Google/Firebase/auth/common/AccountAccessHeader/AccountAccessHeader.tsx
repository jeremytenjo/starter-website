import React from 'react'
import Box from '@useweb/ui/Box'
import UsewebText from '@useweb/ui/Text'
import LogoIcon from '../../../../../../components/icons/IconLogo'

export default function AccountAccessHeader({ title, message = '', subTitle = '' }) {
  return (
    <Wrapper>
      <LogoIcon
        sx={{
          justifySelf: 'center',
          width: '45px',
          height: '45px',
        }}
      />

      <UsewebText
        text={title}
        sx={{
          color: 'black.main',
          fontWeight: 500,
          fontSize: 23,
          lineHeight: '32px',
          textAlign: 'center',
          maxWidth: '220px',
          justifySelf: 'center',
        }}
      />

      {subTitle && (
        <UsewebText
          text={subTitle}
          sx={{
            color: 'black.main',
            fontWeight: 500,
            fontSize: 15,
            textAlign: 'center',
            mt: '-5px',
          }}
        />
      )}

      {message && (
        <UsewebText
          text={message}
          sx={{
            color: 'black.main',
            fontWeight: 400,
            fontSize: 16,
            textAlign: 'left',
            mt: 2,
          }}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='AccountAccessHeader'
      sx={{
        display: 'grid',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridGap: '10px',
        mb: '50px',
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
