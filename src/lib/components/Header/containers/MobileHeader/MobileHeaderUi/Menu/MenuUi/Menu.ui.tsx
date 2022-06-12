import React, { useEffect, useState } from 'react'
import Box from '@useweb/box'
import IconButton from '@mui/material/IconButton'
import Button from '@useweb/button'
import Dialog from '@useweb/dialog'

import IconHamburger from '../../../../../../icons/IconHamburger'
import Image from '../../../../../../Image/Image'
import Link from '../../../../../../Link/Link'
import Text from '../../../../../../Text/Text'
import SocialContacts from '../../../../../../SocialContacts/SocialContacts'

export type MenuUiProps = {
  links: any[]
}

export default function MenuUi({ links }) {
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  const openDialog = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  useEffect(() => {
    setActiveLink(location.href)
  }, [])

  const onLinkClick = (linkUrl) => {
    setActiveLink(linkUrl)
    closeDialog()
  }

  return (
    <Wrapper>
      <Trigger onClick={openDialog} />
      <Modal
        open={open}
        activeLink={activeLink}
        links={links}
        onLinkClick={onLinkClick}
        closeDialog={closeDialog}
      />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return <Box data-id='Menu'>{children}</Box>
}

const Trigger = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label='Hamburger Icon'>
      <IconHamburger />
    </IconButton>
  )
}

const Modal = ({ open, activeLink, links, closeDialog, onLinkClick }) => {
  return (
    <Dialog fullScreen open={open} onClose={closeDialog}>
      <Box
        sx={{
          p: 3,
          display: 'grid',
        }}
      >
        <Logo />
        <CategoriesList links={links} activeLink={activeLink} onLinkClick={onLinkClick} />
        <Socials />
        <CloseButton closeDialog={closeDialog} />
      </Box>
    </Dialog>
  )
}

const Logo = ({}) => {
  return (
    <Link
      href='/'
      sx={{
        justifySelf: 'center',
        mb: '35px',
      }}
    >
      <Image
        src='/images/logo/logo.svg'
        width={'80px'}
        height={'80px'}
        alt='OnlyFindz beautiful logo'
      />
    </Link>
  )
}

const CategoriesList = ({ links, onLinkClick, activeLink }) => {
  return (
    <Box
      sx={{
        display: 'grid',
      }}
    >
      {links.map((link) => {
        const isActive = activeLink.includes(link.url as any)
        const color = isActive
          ? {
              color: 'black.main',
            }
          : {
              color: 'white.main',
            }
        return (
          <Link
            key={link.label}
            href={link.url as any}
            onClick={() => onLinkClick(link.url)}
            scroll
            sx={{
              ...color,
              fontStyle: 'normal',
              fontFamily: 'PoppinsRegular',
              fontSize: '23px',
              fontWeight: 'bold',
              width: '200px',
              textDecoration: 'none',
              mb: 2,
              '&:last-of-type': {
                mb: '70px',
              },
              '&:hover': {
                color: 'black.main',
              },
            }}
          >
            {link.label}
          </Link>
        )
      })}
    </Box>
  )
}

const Socials = ({}) => {
  return (
    <Box
      sx={{
        mb: '60px',
      }}
    >
      <SocialContacts />
    </Box>
  )
}

const CloseButton = ({ closeDialog }) => {
  return (
    <Button
      name='Close Button'
      onClick={closeDialog}
      variant='contained'
      sx={{
        backgroundColor: 'white.main',
        borderRadius: '10px',
        width: '82px',
        height: '35px',
        mb: '20px',
        color: 'black.main',
        justifySelf: 'end',
      }}
    >
      <Text
        text='Close'
        sx={{
          color: 'black.main',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      />
    </Button>
  )
}
