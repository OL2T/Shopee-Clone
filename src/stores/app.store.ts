import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from 'src/types/user.type'
import { ExtendedPurchase } from 'src/apis/purchase.type'

interface AppState {
  // State
  isAuthenticated: boolean
  user: User | null
  extendedPurchase: ExtendedPurchase[]

  // Actions
  setIsAuthenticated: (value: boolean) => void
  setUser: (user: User | null) => void
  setExtendedPurchase: (
    purchases:
      | ExtendedPurchase[]
      | ((prev: ExtendedPurchase[]) => ExtendedPurchase[])
  ) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        isAuthenticated: Boolean(localStorage.getItem('access_token')),
        user: null,
        extendedPurchase: [],

        // Actions
        setIsAuthenticated: (value) =>
          set({ isAuthenticated: value }, false, 'setIsAuthenticated'),

        setUser: (user) => set({ user }, false, 'setUser'),

        setExtendedPurchase: (extendedPurchase) =>
          set(
            (state) => ({
              extendedPurchase:
                typeof extendedPurchase === 'function'
                  ? extendedPurchase(state.extendedPurchase)
                  : extendedPurchase
            }),
            false,
            'setExtendedPurchase'
          ),

        reset: () =>
          set(
            {
              isAuthenticated: false,
              user: null,
              extendedPurchase: []
            },
            false,
            'reset'
          )
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user
        })
      }
    ),
    { name: 'app-store' }
  )
)
