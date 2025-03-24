import React, { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/apis/purchase.type'
import { getAccessTokenFromLocalStorage, getUser } from 'src/types/auth'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {},
  user: getUser(),
  setUser: () => {},
  extendedPurchase: [],
  setExtendedPurchase: () => {},
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [user, setUser] = useState<User | null>(initialAppContext.user)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(
    initialAppContext.extendedPurchase
  )

  const reset = () => {
    setIsAuthenticated(false)
    setUser(null)
    setExtendedPurchase([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        extendedPurchase,
        setExtendedPurchase,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
