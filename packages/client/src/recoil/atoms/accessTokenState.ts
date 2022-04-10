import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

export const AccessTokenStateKey = getPrefixedKey('AUTH_TOKEN')

export type AccessTokenStateType = string | null

const accessTokenState = atom<AccessTokenStateType>({
  key: AccessTokenStateKey,
  default: null,
  effects_UNSTABLE: [StorageEffect(AccessTokenStateKey)]
})

export default accessTokenState
