import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import http from 'src/utils/http'
import { SuccessResponseAPI } from '../types/utils.type'

const URL = 'products'

const productAPI = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseAPI<ProductList>>(URL, { params })
  },
  getProductById(id: string) {
    return http.get<SuccessResponseAPI<Product>>(`${URL}/${id}`)
  }
}

export default productAPI
