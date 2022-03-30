export interface LoggedInUser {
  email: string
  id: string
}

export interface TokenPayload extends Omit<LoggedInUser, 'id'> {
  sub: string
}
