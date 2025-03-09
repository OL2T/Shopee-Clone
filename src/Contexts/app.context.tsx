import React, { createContext, useState } from 'react'
import { getAccessTokenFromLocalStorage, getUser } from 'src/types/auth'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => {},
  user: getUser(),
  setUser: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [user, setUser] = useState<User | null>(initialAppContext.user)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
