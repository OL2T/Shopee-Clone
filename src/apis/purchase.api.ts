import { SuccessResponseAPI } from 'src/types/utils.type'
import http from 'src/utils/http'
import { PurChase, PurChaseListStatus } from './purchase.type'

const URL = 'purchases'

const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessResponseAPI<PurChase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurChaseListStatus }) => {
    return http.get<SuccessResponseAPI<PurChase[]>>(URL, {
      params
    })
  }
}

export default purchaseApi
