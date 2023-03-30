import React from 'react'
import UsewebButton from '@useweb/ui/Button'
import UsewebText from '@useweb/ui/Text'

export default function SignInButton() {
  return (
    <Wrapper>
      <JoinAsCreatorText />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <UsewebButton
      data-id='SignInButton'
      sx={{
        display: 'grid',
        width: '100%',
        height: '41px',
        color: 'primary.main',
        backgroundColor: 'primary.main',
        borderRadius: '6px',
        gridAutoFlow: 'column',
        gridGap: '10px',
        alignItems: 'center',
        alignContent: 'center',

        paddingLeft: '31px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '31px',
      }}
      name='sign in button'
    >
      {children}
    </UsewebButton>
  )
}

const JoinAsCreatorText = () => {
  return (
    <UsewebText
      text={`Sign In`}
      sx={{
        color: 'white.main',
        fontWeight: 700,
        fontSize: 14,
        lineHeight: '16.94318199157715px',
        textAlign: 'center',
      }}
    />
  )
}
