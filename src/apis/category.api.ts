import { Category } from 'src/types/category.type'
import { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'
const categoriesAPI = {
  getCategories() {
    return http.get<SuccessResponseAPI<Category[]>>(URL)
  }
}

export default categoriesAPI
