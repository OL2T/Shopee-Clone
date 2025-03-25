const path = {
  login: '/login',
  register: '/register',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/change-password',
  purchase: '/user/purchase',
  home: '/',
  logout: '/logout',
  cart: '/cart',
  productPk: ':nameId'
} as const

export default path
