import { Product } from 'src/types/product.type'

export type PurChaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type PurChaseListStatus = PurChaseStatus | 0

export interface PurChase {
  buy_count: number
  price: number
  price_before_discount: number
  status: PurChaseStatus
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
