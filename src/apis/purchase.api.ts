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
  },
  buyProduct: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<SuccessResponseAPI<PurChase[]>>(
      `${URL}/buy-products`,
      body
    )
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessResponseAPI<PurChase>>(
      `${URL}/update-purchase`,
      body
    )
  },
  deletePurchase: (purchaseIds: string[]) => {
    return http.delete<SuccessResponseAPI<PurChase>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
