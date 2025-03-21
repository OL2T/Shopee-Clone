// import path from 'src/constant/path'
// import { AuthResponse } from 'src/types/auth.type'
// import http from 'src/utils/http'

// export const registerAccount = (body: { email: string; password: string }) => {
//   return http.post<AuthResponse>(path.register, body)
// }

// export const loginAccount = (body: { email: string; password: string }) => {
//   return http.post<AuthResponse>(path.login, body)
// }

// export const logoutAccount = () => {
//   return http.post(path.logout)
// }
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logoutAccount() {
    return http.post(URL_LOGOUT)
  }
}

export default authApi
