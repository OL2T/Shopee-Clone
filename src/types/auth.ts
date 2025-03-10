import { User } from './user.type'

export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getUser = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user) as User
  }
  return null
}

export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}
