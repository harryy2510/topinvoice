import { DashboardOutlined, PeopleOutlined, ReceiptOutlined } from '@mui/icons-material'
import { Button as MuiButton, ButtonProps, Divider, styled, SvgIconProps, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { ComponentType, FC, useCallback } from 'react'
import { Link as BaseLink } from 'react-router-dom'
import Flex from '../../components/Flex'
import useRouteMatch from '../../hooks/useRouteMatch'

export type MenuItem = ButtonProps<'button'> & {
  icon: ComponentType<SvgIconProps>
  title?: string
  to?: string
  divider?: boolean
}

const topNavMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: DashboardOutlined,
    to: '/'
  },
  {
    title: 'Clients',
    icon: PeopleOutlined,
    to: '/clients'
  },
  {
    title: 'Invoices',
    icon: ReceiptOutlined,
    to: '/invoices'
  }
]

const bottomNavMenuItems: MenuItem[] = []

const routes = topNavMenuItems.filter((item) => item.to).map((item) => item.to!)

const Button = styled(MuiButton)(({ theme }) => ({
  flexDirection: 'column',
  textTransform: 'none',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  color: theme.palette.text.disabled,
  fill: theme.palette.text.disabled,
  '&.active, &:hover': {
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default
  }
}))

const RenderNavItem: FC<MenuItem & { active?: boolean }> = ({ active, icon, title, to, divider, ...buttonProps }) => {
  const ariaCurrent = active ? 'page' : undefined
  const Icon = icon

  return (
    <>
      <Box px={1.5} py={0.5}>
        <Button
          fullWidth
          variant="text"
          {...buttonProps}
          {...(to
            ? {
                'aria-current': ariaCurrent,
                to,
                component: BaseLink,
                className: clsx(active && 'active')
              }
            : {})}
        >
          <Icon color="inherit" />
          {title && (
            <Typography color="text.primary" mt={0.25} variant="body2">
              {title}
            </Typography>
          )}
        </Button>
      </Box>
      {divider && <Divider variant="middle" sx={{ my: 0.5 }} />}
    </>
  )
}

const NavMenu: FC = () => {
  const routeMatch = useRouteMatch(routes)
  const currentTab = routeMatch?.pattern?.path

  const renderMenuItems = useCallback(
    (menuItems: MenuItem[]) =>
      menuItems.map((navItem, index) => (
        <RenderNavItem {...navItem} active={Boolean(navItem.to && currentTab === navItem.to)} key={index} />
      )),
    [currentTab]
  )

  return (
    <Flex pt={9} pb={1} flexDirection="column" height="100%">
      <Box flex={1} overflow="auto">
        {renderMenuItems(topNavMenuItems)}
      </Box>
      <Box>{renderMenuItems(bottomNavMenuItems)}</Box>
    </Flex>
  )
}

export default NavMenu
