import { Location } from 'react-router-dom'
import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

export const RedirectStateKey = getPrefixedKey('REDIRECT')

export type RedirectStateType = { from: Location } | null

const redirectState = atom<RedirectStateType>({
  key: RedirectStateKey,
  default: null,
  effects_UNSTABLE: [StorageEffect(RedirectStateKey, window.sessionStorage)]
})

export default redirectState
