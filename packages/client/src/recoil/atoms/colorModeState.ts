import { PaletteMode } from '@mui/material'
import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

export const ColorModeStateKey = getPrefixedKey('COLOR_MODE')

const colorModeState = atom<PaletteMode>({
  key: ColorModeStateKey,
  default: 'dark',
  effects: [StorageEffect(ColorModeStateKey)]
})

export default colorModeState
