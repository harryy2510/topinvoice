import { MenuOutlined } from '@mui/icons-material'
import { AppBar as MuiAppBar, Avatar, IconButton, Link, styled, Theme, Toolbar } from '@mui/material'
import Box from '@mui/material/Box'
import { bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import TopInvoiceLogo from '../../assets/icons/TopInvoiceLogo'
import ProfileMenu from '../../components/ProfileMenu'
import { useViewerQuery } from '../../graphql/generated'
import useMobileView from '../../hooks/useMobileView'
import sidebarState from '../../recoil/atoms/sidebarState'

export const AppBar = styled(MuiAppBar)(({ theme }) => ({ zIndex: theme.zIndex.drawer + 1 }))

export type HeaderProps = {
  setupMode?: boolean
}

const Header: FC<HeaderProps> = ({ setupMode }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'profile-menu' })
  const viewer = useViewerQuery()?.data?.viewer
  const mobileView = useMobileView('md')
  const setSidebarState = useSetRecoilState(sidebarState)

  return (
    <AppBar color="default" sx={(theme: Theme) => ({ backgroundColor: theme.palette.background.paper })}>
      <Toolbar sx={{ py: 0.5 }}>
        {!setupMode && mobileView && (
          <IconButton sx={{ ml: -1, mr: 1 }} color="inherit" onClick={() => setSidebarState((value) => !value)}>
            <MenuOutlined />
          </IconButton>
        )}
        <Link underline="none" lineHeight={0} component={RouterLink} to="/">
          <TopInvoiceLogo sx={{ width: { xs: 160, md: 190 } }} />
        </Link>
        {viewer && (
          <>
            <Box flex={1} />
            <IconButton size="small" {...bindTrigger(popupState)}>
              <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.light' }} src={viewer.profileImage ?? ''}>
                {viewer.firstName?.slice(0, 1)}
              </Avatar>
            </IconButton>
            <ProfileMenu setupMode={setupMode} {...popupState} />
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
