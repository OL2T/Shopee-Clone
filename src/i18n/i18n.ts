import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_DETAIL_EN from 'src/locales/en/productDetail.json'
import PRODUCT_DETAIL_VI from 'src/locales/vi/productDetail.json'
import CART_EN from 'src/locales/en/cart.json'
import CART_VI from 'src/locales/vi/cart.json'
import USER_EN from 'src/locales/en/user.json'
import USER_VI from 'src/locales/vi/user.json'
import HEADER_EN from 'src/locales/en/header.json'
import HEADER_VI from 'src/locales/vi/header.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    productDetail: PRODUCT_DETAIL_EN,
    cart: CART_EN,
    user: USER_EN,
    header: HEADER_EN
  },
  vi: {
    home: HOME_VI,
    productDetail: PRODUCT_DETAIL_VI,
    cart: CART_VI,
    user: USER_VI,
    header: HEADER_VI
  }
}

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // React already safes from xss
  }
})
export default i18n
