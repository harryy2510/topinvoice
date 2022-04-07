import { PaletteMode } from '@mui/material'
import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

const key = getPrefixedKey('COLOR_MODE')

const colorModeState = atom<PaletteMode>({
  key,
  default: 'dark',
  effects: [StorageEffect(key)]
})

export default colorModeState
