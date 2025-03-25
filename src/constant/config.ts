import { megabyte } from './unitFile'

const config = {
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL : '/api',
  maxSizeUpload: megabyte
}

export default config
