import { useAppStore } from './app.store'

// Individual selectors for better performance (RECOMMENDED)
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated)
export const useUser = () => useAppStore((state) => state.user)
export const useExtendedPurchase = () =>
  useAppStore((state) => state.extendedPurchase)

// Action selectors
export const useSetIsAuthenticated = () =>
  useAppStore((state) => state.setIsAuthenticated)
export const useSetUser = () => useAppStore((state) => state.setUser)
export const useSetExtendedPurchase = () =>
  useAppStore((state) => state.setExtendedPurchase)
export const useReset = () => useAppStore((state) => state.reset)

// Grouped selectors - chỉ dùng khi thực sự cần thiết
// Auth selectors - sử dụng individual selectors thay vì object
export const useAuth = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  const user = useAppStore((state) => state.user)
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const setUser = useAppStore((state) => state.setUser)

  return {
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser
  }
}

// Cart selectors - sử dụng individual selectors
export const useCart = () => {
  const extendedPurchase = useAppStore((state) => state.extendedPurchase)
  const setExtendedPurchase = useAppStore((state) => state.setExtendedPurchase)

  return {
    extendedPurchase,
    setExtendedPurchase
  }
}

// Actions selectors - sử dụng individual selectors
export const useAppActions = () => {
  const reset = useAppStore((state) => state.reset)
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated)
  const setUser = useAppStore((state) => state.setUser)
  const setExtendedPurchase = useAppStore((state) => state.setExtendedPurchase)

  return {
    reset,
    setIsAuthenticated,
    setUser,
    setExtendedPurchase
  }
}
