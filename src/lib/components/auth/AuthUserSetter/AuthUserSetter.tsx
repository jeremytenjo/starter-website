import React, { useEffect, useState } from 'react'
import List from '@useweb/ui/List'
import Text from '@useweb/ui/Text'
import userStubs from '../../../../data/users/users.stubs'
import type UserSchema from '../../../../data/users/user.schema'
import Avatar from '@useweb/ui/Avatar'
import MenuItem from '@useweb/ui/MenuItem'
import Dialog from '@useweb/ui/Dialog'
import useKeyPress from '@useweb/use-key-press'
import Button from '@useweb/ui/Button'
import IconButton from '@useweb/ui/IconButton'
import useAuth from '../../../integrations/Google/Firebase/auth/useAuth/useAuth'
import LinearProgress from '@useweb/ui/LinearProgress'
import ErrorMessage from '@useweb/ui/ErrorMessage'

export type AuthUserSetterProps = { open?: boolean; signInAs?: string; children?: any }

export default function AuthUserSetter(props: AuthUserSetterProps) {
  const [openDialog, setOpenDialog] = useState(props.open)
  const auth = useAuth({
    onSignIn() {
      setOpenDialog(() => false)
    },
    onSignOut() {
      setOpenDialog(() => false)
    },
  })

  const renderChildren = props.signInAs ? auth.user : true

  useEffect(() => {
    if (props.signInAs) {
      const email = userStubs.filter((u) => u.uid === props.signInAs)[0].email
      const password = 'password'

      auth.signIn({
        emailSignIn: {
          email,
          password,
        },
      })
    }
  }, [props.signInAs])

  useKeyPress('u', () => setOpenDialog((s) => !s))

  return (
    <>
      {renderChildren && (props.children || null)}
      <IconButton
        name='AuthUserSetter trigger'
        onClick={() => setOpenDialog((s) => !s)}
        sx={{
          position: 'fixed',
          bottom: '15px',
          left: '40px',
          display: [, , 'none'],
        }}
      >
        <Avatar
          title={
            !auth?.user
              ? 'Click to sign in'
              : `Signed in as ${auth?.user?.displayName} (${auth?.user?.uid})`
          }
          src={auth?.user?.photoURL}
          sx={{
            width: '30px',
            height: '30px',
          }}
        />
      </IconButton>

      <Dialog
        open={!!openDialog}
        onClose={() => setOpenDialog(false)}
        data-id='AuthUserSetter'
        wrapperSx={{
          width: ['300px', , '400px'],
        }}
        title={
          auth.user.displayName ? `Signed in as ${auth.user.displayName}` : 'Sign in'
        }
      >
        <List<UserSchema>
          data={userStubs || []}
          listItemKeyName='uid'
          ListItemComponent={({ itemData }) => {
            const isSignedIn = auth?.user?.uid === itemData.uid

            return (
              <MenuItem
                {...menuttempoprs}
                onClick={() => {
                  if (isSignedIn) return
                  auth.signIn({
                    emailSignIn: {
                      email: itemData.email as string,
                      password: 'password',
                    },
                  })
                }}
                sx={{
                  display: 'grid',
                  gap: '20px',
                  gridAutoFlow: 'column',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '100px',
                  pl: '0px',
                  height: 'fit-content',
                }}
              >
                <Avatar src={itemData.photoURL} />

                {itemData && (
                  <Text
                    text={itemData?.displayName}
                    sx={{
                      color: isSignedIn ? 'primary.dark' : 'black.main',
                    }}
                  />
                )}

                {isSignedIn && (
                  <Button
                    onClick={auth.signOut}
                    name='sign out'
                    variant='text'
                    sx={{
                      color: 'primary.dark',
                      transform: 'translateX(30px)',
                    }}
                  >
                    Sign out
                  </Button>
                )}
              </MenuItem>
            )
          }}
        />

        {auth.isSigningIn && (
          <>
            <LinearProgress
              sx={{
                mt: 2,
              }}
            />
          </>
        )}

        <ErrorMessage
          error={auth.signingInError}
          message={auth.signingInError.toString()}
        />
      </Dialog>
    </>
  )
}

const menuttempoprs = {
  component: 'div',
}
