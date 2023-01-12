import React, { useEffect, useState } from 'react'
import Text from '@useweb/ui/Text'
import List from '@useweb/ui/List'
import userStubs from '../../../data/users/users.stubs'
import type UserSchema from '../../../data/users/user.schema'
import Avatar from '@useweb/ui/Avatar'
import MenuItem from '@useweb/ui/MenuItem'
import Dialog from '@useweb/ui/Dialog'
import useKeyPress from '@useweb/use-key-press'
import Box from '@useweb/ui/Box'
import Button from '@useweb/ui/Button'
import IconButton from '@useweb/ui/IconButton'
import useAuth from '../../integrations/Google/Firebase/auth/useAuth/useAuth'
import LinearProgress from '@useweb/ui/LinearProgress'

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

      auth.signIn.exec({
        email,
        password,
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
          bottom: '10px',
          left: '40px',
          display: [, , 'none'],
        }}
      >
        u
      </IconButton>

      <Dialog
        open={!!openDialog}
        onClose={() => setOpenDialog(false)}
        data-id='AuthUserSetter'
      >
        <Box
          sx={{
            width: ['300px', , '400px'],
            p: '10px 20px',
          }}
        >
          <Text
            text={`Sign in as`}
            sx={{
              fontSize: '19px',
              mb: 3,
              fontWeight: 600,
              textAlign: 'center',
            }}
          />
          <List<UserSchema>
            data={userStubs || []}
            ListItemComponent={({ itemData = {} }) => {
              return (
                <MenuItem
                  {...menuttempoprs}
                  onClick={() => {
                    auth.signIn.exec({
                      email: itemData.email as string,
                      password: 'password',
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
                  <Text text={itemData.displayName} />
                </MenuItem>
              )
            }}
          />

          {auth.signIn.loading && (
            <>
              <LinearProgress
                sx={{
                  mt: 2,
                }}
              />
            </>
          )}

          {auth.signIn.error && (
            <>
              <Text
                text={auth.signIn.error.toString()}
                sx={{
                  color: 'red',
                  mt: 2,
                }}
              />
            </>
          )}

          <Button
            onClick={auth.signOut}
            name='sign out button'
            variant='text'
            sx={{
              color: 'black.main',
              mt: '30px',
              width: 'fit-content',
              fontWeight: '600',
            }}
          >
            Sign out
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

const menuttempoprs = {
  component: 'div',
}
