import { User } from './user.type'
import { ResponseAPI } from './utils.type'

export type AuthResponse = ResponseAPI<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
