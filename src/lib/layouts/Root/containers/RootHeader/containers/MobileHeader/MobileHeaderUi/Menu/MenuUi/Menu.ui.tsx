import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Dialog from '@useweb/ui/Dialog'
import Text from '@useweb/ui/Text'

import IconxSmall from '../../../../../../../../../components/icons/IconxSmall'
import IconHamburger from '../../../../../../../../../components/icons/IconHamburger'
import Link from '../../../../../../../../../components/basic/misc/Link/Link'
import type NavLinkSchema from '../../../../../../../../../../data/_commonSchemas/NavLinkSchema'
import SiteLogo from '../../../../../../../../../components/basic/misc/SiteLogo/SiteLogo'

export type MenuUiProps = {
  links: NavLinkSchema[]
  logoSrc?: string
}

export default function MenuUi({ links = [], logoSrc }: MenuUiProps) {
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

  return links?.length ? (
    <Wrapper>
      <Trigger onClick={openDialog} />
      <Modal
        open={open}
        activeLink={activeLink}
        links={links}
        onLinkClick={onLinkClick}
        closeDialog={closeDialog}
        logoSrc={logoSrc}
      />
    </Wrapper>
  ) : null
}

const Wrapper = ({ children }) => {
  return <Box data-id='Menu'>{children}</Box>
}

const Trigger = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <IconHamburger />
    </IconButton>
  )
}

const Modal = ({ open, activeLink, links, closeDialog, onLinkClick, logoSrc }) => {
  return (
    <Dialog fullScreen open={open} onClose={closeDialog}>
      <Box
        sx={{
          p: 3,
          display: 'grid',
          backgroundColor: 'white.main',
          height: '100%',
          alignItems: 'start',
          alignContent: 'start',
        }}
      >
        <Logo src={logoSrc} />
        <NavLinks links={links} activeLink={activeLink} onLinkClick={onLinkClick} />
        <CloseButton closeDialog={closeDialog} />
      </Box>
    </Dialog>
  )
}

const Logo = ({ src }) => {
  return <SiteLogo src={src} width={164} height={68} />
}

const NavLinks = ({ links = [], onLinkClick, activeLink }) => {
  return (
    <Box
      sx={{
        display: 'grid',
      }}
    >
      {links.map((link: NavLinkSchema) => {
        const isActive = activeLink.includes(link.url as any)
        const color = isActive
          ? {
              color: 'primary.main',
            }
          : {
              color: 'black.main',
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
              fontFamily: 'HelveticaNeueRegular',
              fontSize: '23px',
              fontWeight: 'bold',
              width: '200px',
              textDecoration: 'none',
              mb: 2,

              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <Text text={link.label} />
          </Link>
        )
      })}
    </Box>
  )
}

const CloseButton = ({ closeDialog }) => {
  return (
    <IconButton
      onClick={closeDialog}
      sx={{
        mb: '20px',
        justifySelf: 'end',
        position: 'absolute',
      }}
    >
      <IconxSmall />
    </IconButton>
  )
}
