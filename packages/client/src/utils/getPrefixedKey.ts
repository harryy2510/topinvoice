import config from '../config'

const getPrefixedKey = (key: string, prefix = config.storagePrefix) => `${prefix}_${key}`

export default getPrefixedKey
