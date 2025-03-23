import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController/QuantityController'
import path from 'src/constant/path'
import { purchaseStatus } from 'src/constant/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import './styles.scss'
import { useEffect, useState } from 'react'
import { PurChase } from 'src/apis/purchase.type'
import { produce } from 'immer'
interface ExtendedPurchase extends PurChase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(
    []
  )

  const { data: cartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })

  const inCartData = cartData?.data.data
  const isCheckedAll = extendedPurchase?.every((purchase) => purchase.checked)
  useEffect(() => {
    if (inCartData) {
      setExtendedPurchase(
        inCartData.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: false
        }))
      )
    }
  }, [inCartData])
  // console.log('extendedPurchase', extendedPurchase)

  const handleChecked =
    (purchaseId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchase(
        produce((draft) => {
          const purchaseIndex = draft.findIndex(
            (purchase) => purchase._id === purchaseId
          )
          draft[purchaseIndex].checked = event.target.checked
        })
      )
    }

  const handleCheckedAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckedAll
      }))
    )
  }

  const handlePaidTotal = () => {
    if (!extendedPurchase) return 0

    const total = extendedPurchase
      .filter((purchase) => purchase.checked)
      .reduce(
        (total, purchase) => total + purchase.price * purchase.buy_count,
        0
      )
    return formatCurrency(total)
  }
  // const handleDelete = (purchaseId: string) => {
  //   purchaseApi.deletePurchase([purchaseId])
  // }
  return (
    <>
      <div className='bg-white px-5 h-[55px] flex items-center justify-between mb-3'>
        <div className='flex items-center flex-1'>
          <input
            type='checkbox'
            className='flex w-[18px] h-[18px] mx-5 accent-orange'
            checked={isCheckedAll}
            onChange={handleCheckedAll}
          />
          <span className='text-gray-500 text-sm'>Sản Phẩm</span>
        </div>
        <div className='flex items-center justify-between w-[55%] text-center'>
          <span className='text-gray-500 text-sm w-1/4'>Đơn giá</span>
          <span className='text-gray-500 text-sm w-1/4'>Số lượng</span>
          <span className='text-gray-500 text-sm w-1/4'>Số tiền</span>
          <span className='text-gray-500 text-sm w-1/4'>Thao tác</span>
        </div>
      </div>

      {extendedPurchase?.map((purchase) => {
        const buyCount = purchase.buy_count

        return (
          <div className='bg-white px-5 mb-3' key={purchase._id}>
            <div className='flex flex-col gap-4 py-4 text-gray-500'>
              <div className='flex items-center rounded-md'>
                <div className='flex items-center flex-1'>
                  <input
                    type='checkbox'
                    className='flex w-[18px] h-[18px] mx-5 accent-orange'
                    checked={purchase.checked}
                    onChange={handleChecked(purchase._id)}
                  />
                  <Link
                    className='flex flex-1'
                    to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  >
                    <div className='w-20 h-20 bg-white overflow-hidden mr-2 flex-shrink-0'>
                      <img
                        src={purchase.product.image}
                        alt={purchase.product.name}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div className='flex flex-col flex-1'>
                      <span className='text-gray-800 text-sm'>
                        {purchase.product.name}
                      </span>
                      <span className='text-sm text-gray-500'>
                        Phân loại: {purchase.product.category.name}
                      </span>
                    </div>
                  </Link>
                </div>

                <div className='flex items-center justify-between w-[55%] text-center text-sm'>
                  <div className='w-1/4 flex items-center justify-center'>
                    <span className='text-gray-500 line-through mr-2'>
                      {formatCurrency(purchase.price_before_discount)}
                    </span>
                    <span className='text-gray-900'>
                      {formatCurrency(purchase.price)}
                    </span>
                  </div>

                  <QuantityController
                    classNameWrapper='w-1/4 flex-col gap-2'
                    value={buyCount}
                    max={purchase.product.quantity}
                  />

                  <div className='w-1/4'>
                    <span className='text-orange'>
                      {formatCurrency(purchase.price * buyCount)}
                    </span>
                  </div>

                  <button
                    type='button'
                    className='w-1/4 first:text-gray-500 hover:text-orange'
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className='cart-sticky sticky bottom-0 bg-white'>
        <div className='flex items-center justify-between py-4 border-t border-dashed px-5'>
          <div className='flex items-center flex-1'>
            <input
              type='checkbox'
              className='flex w-5 h-5 mx-5 accent-orange'
              checked={isCheckedAll}
              onChange={handleCheckedAll}
            />
            <button onClick={handleCheckedAll}>
              Chọn tất cả ({extendedPurchase.length})
            </button>
          </div>
          <div className='mr-6'>
            <span className='text-gray-700'>
              Tổng thanh toán (
              {extendedPurchase.filter((purchase) => purchase.checked).length}{' '}
              Sản phẩm):
            </span>
            <span className='text-orange font-semibold ml-1'>
              {handlePaidTotal()}
            </span>
          </div>

          <button
            type='button'
            className='bg-orange text-white text-sm px-6 py-2'
          >
            Mua Hàng
          </button>
        </div>
      </div>
    </>
  )
}
