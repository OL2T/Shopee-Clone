import { useMutation, useQuery } from '@tanstack/react-query'
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
import { keyBy } from 'lodash'
interface ExtendedPurchase extends PurChase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(
    []
  )

  const { data: cartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })

  const inCartData = cartData?.data.data
  const isCheckedAll = extendedPurchase?.every((purchase) => purchase.checked)
  useEffect(() => {
    if (inCartData) {
      setExtendedPurchase((prev) => {
        const extendedPurchasesObject = keyBy(prev, '_id')
        return inCartData.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase._id]?.checked)
        }))
      })
    }
  }, [inCartData])
  // console.log('extendedPurchase', extendedPurchase)

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProduct
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

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

  const handleBuyCount = (
    purchaseId: string,
    value: number,
    enable: boolean
  ) => {
    if (enable) {
      setExtendedPurchase(
        produce((draft) => {
          const purchaseIndex = draft.findIndex(
            (purchase) => purchase._id === purchaseId
          )
          draft[purchaseIndex].disabled = true
          draft[purchaseIndex].buy_count = value
        })
      )
      const purchase = extendedPurchase.find(
        (purchase) => purchase._id === purchaseId
      )
      updatePurchaseMutation.mutate({
        product_id: purchase?.product._id as string,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (purchaseId: string) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        const purchaseIndex = draft.findIndex(
          (purchase) => purchase._id === purchaseId
        )
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const onSubmit = () => {
    const purchaseIds = extendedPurchase
      .filter((purchase) => purchase.checked)
      .map((purchase) => purchase.product._id)
    console.log('purchaseIds', purchaseIds)
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

  const handleCalcSaved = () => {
    if (!extendedPurchase) return 0

    const total = extendedPurchase
      .filter((purchase) => purchase.checked)
      .reduce(
        (total, purchase) =>
          total +
          (purchase.price_before_discount - purchase.price) *
            purchase.buy_count,
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
                    classNameQuantity='sr-only'
                    classNameInput='flex items-center justify-center text-center w-[50px] h-8 border-t border-b outline-none'
                    value={buyCount}
                    max={purchase.product.quantity}
                    onIncrease={(value) =>
                      handleBuyCount(
                        purchase._id,
                        value,
                        value <= purchase.product.quantity
                      )
                    }
                    onDecrease={(value) => {
                      console.log('value', value)
                      return handleBuyCount(
                        purchase._id,
                        value,
                        value >= 1 &&
                          value !==
                            inCartData?.find(
                              (item) => item._id === purchase._id
                            )?.buy_count
                      )
                    }}
                    onType={handleTypeQuantity(purchase._id)}
                    onFocusOut={(value) =>
                      handleBuyCount(
                        purchase._id,
                        value,
                        value <= purchase.product.quantity &&
                          value >= 1 &&
                          value !==
                            inCartData?.find(
                              (item) => item._id === purchase._id
                            )?.buy_count
                      )
                    }
                    disabled={purchase.disabled}
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
            <button className='ml-8'>Xoá</button>
          </div>
          <div className=''>
            <div className='flex items-center'>
              <span className='text-gray-700 mr-4'>
                <span>Tổng thanh toán</span> (
                {extendedPurchase.filter((purchase) => purchase.checked).length}
                <span> Sản phẩm</span>):
              </span>
              <span className='flex items-center text-2xl text-orange ml-1'>
                <span>{handlePaidTotal()}</span>
                <div className='ml-3'>
                  <svg
                    viewBox='0 0 12 12'
                    fill='none'
                    width={12}
                    height={12}
                    color='rgba(0, 0, 0, 0.54)'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6 4L.854 9.146.146 8.44l5.147-5.146a1 1 0 011.414 0l5.147 5.146-.707.707L6 4z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              </span>
            </div>
            {extendedPurchase.some((purchase) => purchase.checked) && (
              <div className='text-sm flex justify-end mt-2'>
                Tiết kiệm
                <span className='text-orange pl-2.5'>{handleCalcSaved()}</span>
              </div>
            )}
          </div>

          <button
            type='button'
            className='bg-orange text-white text-sm px-12 py-2 ml-6'
            onClick={onSubmit}
          >
            Mua Hàng
          </button>
        </div>
      </div>
    </>
  )
}
