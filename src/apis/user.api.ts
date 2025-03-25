import { User } from 'src/types/user.type'
import { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile
  extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password: string
  newPassword: string
}

const userAPI = {
  getProfile() {
    return http.get<SuccessResponseAPI<User>>('/=me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponseAPI<User>>(`/users`, body)
  },
  uploadAvatar(formData: FormData) {
    return http.post<SuccessResponseAPI<string>>('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userAPI
