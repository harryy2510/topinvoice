import config from '../config'

const getPrefixedKey = (key: string) => `${config.storagePrefix}_${key}`

export default getPrefixedKey
