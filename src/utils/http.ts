import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'
import { toast } from 'react-toastify'
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_REGISTER
} from 'src/apis/auth.api'
import config from 'src/constant/config'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
  setUserToLocalStorage
} from 'src/types/auth'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseAPI } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    const baseURL = config.baseURL
    // Get access token from RAM
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // 'expire-access-token': 5,
        // 'expire-refresh-token': 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = (data as AuthResponse).data.access_token
          this.refreshToken = (data as AuthResponse).data.refresh_token
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
          setUserToLocalStorage(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      async (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        // Lỗi 401
        if (
          isAxiosUnauthorizedError<
            ErrorResponseAPI<{ name: string; message: string }>
          >(error)
        ) {
          const config =
            error.response?.config ||
            ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s để cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((accessToken) => {
              // Gọi lại request cũ với access token mới

              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  authorization: accessToken
                }
              })
            })
          }

          // Còn những trường hợp như token không đúng hoặc không truyền token

          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(
            error.response?.data?.data?.message || error.response?.data?.message
          )
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    try {
      const response = await this.instance.post<RefreshTokenResponse>(
        URL_REFRESH_TOKEN,
        {
          refresh_token: this.refreshToken
        }
      )
      const { access_token } = response.data.data
      setAccessTokenToLocalStorage(access_token)
      this.accessToken = access_token
      return access_token
    } catch (error) {
      clearLocalStorage()
      this.accessToken = ''
      this.refreshToken = ''
      throw error
    }
  }
}

const http = new Http().instance

export default http
