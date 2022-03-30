import { LogoutOutlined, PersonOutlined } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { bindMenu } from 'material-ui-popup-state'
import { PopupState } from 'material-ui-popup-state/core'
import * as React from 'react'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useResetRecoilState } from 'recoil'
import accessTokenState from '../recoil/atoms/accessTokenState'

export type ProfileMenuProps = PopupState & {
  setupMode?: boolean
}

const ProfileMenu: FC<ProfileMenuProps> = ({ children, setupMode, ...popupState }) => {
  const resetAccessToken = useResetRecoilState(accessTokenState)
  const navigate = useNavigate()

  const handleNavLink = (to: string) => {
    navigate(to)
    popupState.close()
  }
  const handleLogout = () => {
    popupState.close()
    resetAccessToken()
  }

  return (
    <Menu {...bindMenu(popupState)}>
      {!setupMode && [
        <MenuItem key="profile" onClick={() => handleNavLink('/profile')} dense>
          <ListItemIcon>
            <PersonOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
      ]}
      <MenuItem onClick={handleLogout} dense>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ProfileMenu
