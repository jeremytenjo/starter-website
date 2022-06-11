import React from 'react'
import Box from '@useweb/box'
import IconButton from '@mui/material/IconButton'

import List from '../../../../List/List'
import Image from '../../../../Image/Image'
import Text from '../../../../Text/Text'
import Link from '../../../../Link/Link'
import SocialContacts from '../../../../SocialContacts/SocialContacts'
import IconSearch from '../../../../icons/IconSearch'
import type ProductSchema from '../../../../../../data/products/product.schema'

export type DesktopHeaderUiProps = {
  links: any[]
  onShowSearchBarClick: () => null
  data: ProductSchema[]
}

export default function DesktopHeaderUi({
  links,
  onShowSearchBarClick,
}: DesktopHeaderUiProps) {
  return (
    <Wrapper>
      <NavLink links={links} />
      <Logo />
      <ActionButtons onShowSearchBarClick={onShowSearchBarClick} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='DesktopHeader'
      sx={{
        display: {
          xs: 'none',
          lg: 'grid',
        },
        gridAutoFlow: 'column',
        width: '100%',
        maxWidth: '1349px',
        margin: '0 auto',
        gridTemplateColumns: '.7fr 1fr .7fr',
        alignItems: 'start',
        mb: '90px',
      }}
    >
      {children}
    </Box>
  )
}

const NavLink = ({ links }) => {
  const ListItemComponent = (link) => {
    return (
      <Link href={link.url}>
        <Text
          text={link.label}
          sx={{
            fontSize: '16px',
            fontFamily: 'PoppinsRegular',
            transition: '0.2s',
            '&:hover': {
              color: 'grey.two',
            },
          }}
        />
      </Link>
    )
  }

  return (
    <Box
      sx={{
        transform: 'translateY(5px)',
      }}
    >
      <List
        data={links}
        ListItemComponent={ListItemComponent}
        sx={{
          gridAutoFlow: 'column',
          gap: '33px',
        }}
      />
    </Box>
  )
}

const Logo = () => {
  return (
    <Box sx={{ mt: '50px', display: 'grid', textAlign: 'center', color: 'grey.two' }}>
      <Link href='/'>
        <Image
          src='/images/logo/logo.svg'
          width={169}
          height={105}
          alt='OnlyFindz beautiful logo'
        />
      </Link>

      <Box
        sx={{
          backgroundColor: 'red',
        }}
      ></Box>
    </Box>
  )
}

const ActionButtons = ({ onShowSearchBarClick }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gap: '33px',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'end',
      }}
    >
      <Box
        onClick={onShowSearchBarClick}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <IconButton
          sx={{
            width: '32px',
            height: '32px',
          }}
        >
          <IconSearch
            sx={{
              fontSize: '18px',
            }}
          />
        </IconButton>

        <Text
          text='Search'
          sx={{
            fontSize: '16px',
            fontFamily: 'PoppinsRegular',
          }}
        />
      </Box>
      <SocialContacts />
    </Box>
  )
}
