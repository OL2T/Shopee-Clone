type Role = 'Admin' | 'User'

export interface User {
  _id: string
  avatar?: string
  address?: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string //ISO 8601
  phone?: string
  createdAt: string
  updatedAt: string
}
