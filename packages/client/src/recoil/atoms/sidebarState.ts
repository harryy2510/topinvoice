import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

export const SidebarStateKey = getPrefixedKey('SIDEBAR')

const sidebarState = atom<boolean>({
  key: SidebarStateKey,
  default: false
})

export default sidebarState
