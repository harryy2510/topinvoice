import ShortUniqueId from 'short-unique-id'

export const shortId = new ShortUniqueId()

export const DEFAULT_ID_LENGTH = 32

const defaultId = (finalLength: number = DEFAULT_ID_LENGTH) => shortId.stamp(finalLength)

export default defaultId
