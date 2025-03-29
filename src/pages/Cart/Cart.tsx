import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController/QuantityController'
import path from 'src/constant/path'
import { purchaseStatus } from 'src/constant/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useContext, useEffect, useMemo, useState } from 'react'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import Button from 'src/components/Button/Button'
import { ProductListConfig } from 'src/types/product.type'
import productAPI from 'src/apis/product.api'
import ProductListSkeleton from '../ProductList/ProductListSkeleton'
import Product from '../ProductList/components/Product/Product'
import Loading from 'src/components/Loading/Loading'
import { AppContext } from 'src/Contexts/app.context'
import Popover from 'src/components/Popover'
import './styles.scss'
import XDialog from 'src/components/XDialog/XDialog'
import CustomToast from 'src/components/CustomToast/CustomToast'
import { useTranslation } from 'react-i18next'

const LIMIT = 12
export default function Cart() {
  const { t } = useTranslation('cart')
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogProductRow, setIsDialogProductRow] = useState(false)
  const [isBuyProduct, setIsBuyProduct] = useState(false)
  const queryConfig: ProductListConfig = {
    page: 1,
    limit: LIMIT
  }

  const {
    data: cartData,
    refetch,
    isLoading: cartDataLoading
  } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  const inCartData = cartData?.data.data

  const { data: productsResponse, isFetching } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productAPI.getProducts(queryConfig as ProductListConfig)
    },
    enabled: !cartDataLoading && (!inCartData || inCartData.length === 0)
  })
  const productsData = productsResponse?.data?.data.products || []

  const isCheckedAll = useMemo(() => {
    return extendedPurchase?.every((purchase) => purchase.checked)
  }, [extendedPurchase])
  const checkedPurchase = useMemo(
    () => extendedPurchase.filter((purchase) => purchase.checked),
    [extendedPurchase]
  )
  const discountPurchase = useMemo(() => {
    return formatCurrency(
      checkedPurchase.reduce(
        (total, purchase) =>
          total +
          (purchase.price_before_discount - purchase.price) *
            purchase.buy_count,
        0
      )
    )
  }, [checkedPurchase])
  const totalPurchase = useMemo(() => {
    return formatCurrency(
      checkedPurchase.reduce(
        (total, purchase) => total + purchase.price * purchase.buy_count,
        0
      )
    )
  }, [checkedPurchase])

  const location = useLocation()
  const purchaseIdFromProductPk = (
    location.state as { purchaseId: string | null }
  )?.purchaseId

  useEffect(() => {
    if (inCartData) {
      setExtendedPurchase((prev) => {
        const extendedPurchasesObject = keyBy(prev, '_id')
        return inCartData.map((purchase) => {
          const isChosenPurchaseId = purchaseIdFromProductPk === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked:
              isChosenPurchaseId ||
              Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        })
      })
    }
  }, [inCartData, purchaseIdFromProductPk, setExtendedPurchase])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProduct
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
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

  const handleBuyPurchase = () => {
    if (checkedPurchase.length > 0) {
      buyProductsMutation.mutate(
        checkedPurchase.map((purchase) => ({
          product_id: purchase.product._id,
          buy_count: purchase.buy_count
        })),
        {
          onSuccess: () => {
            setIsBuyProduct(true)

            setTimeout(() => {
              refetch()
              setIsBuyProduct(false)
            }, 2000)
          }
        }
      )
    }
  }

  const handleDelete = (purchaseId: string) => {
    setIsDialogProductRow(false)
    handleConfirmDelete(purchaseId)
  }

  const handleDeleteManyPurchases = () => {
    setIsDialogOpen(true)
  }

  const handleCancel = () => {
    setIsDialogProductRow(false)
  }

  const handleCancelAllProducts = () => {
    setIsDialogOpen(false)
  }

  const handleConfirmDelete = (purchaseId: string) => {
    setIsDialogOpen(false)
    deletePurchaseMutation.mutate([
      extendedPurchase.find((purchase) => purchase._id === purchaseId)
        ?._id as string
    ])
  }

  const handleConfirm = () => {
    setIsDialogOpen(false)
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  if (cartDataLoading) {
    return <Loading />
  }

  return (
    <>
      {inCartData && inCartData.length > 0 ? (
        <>
          <div className='bg-white px-5 h-[55px] flex items-center justify-between mb-3'>
            <div className='flex items-center flex-1'>
              <input
                type='checkbox'
                className='flex w-[18px] h-[18px] mx-5 accent-orange'
                checked={isCheckedAll}
                onChange={handleCheckedAll}
              />
              <span className='text-gray-500 text-sm'>{t('product')}</span>
            </div>
            <div className='flex items-center justify-between w-[55%] text-center'>
              <span className='text-gray-500 text-sm w-1/4'>
                {t('UnitPrice')}
              </span>
              <span className='text-gray-500 text-sm w-1/4'>
                {t('Quantity')}
              </span>
              <span className='text-gray-500 text-sm w-1/4'>
                {t('TotalPrice')}
              </span>
              <span className='text-gray-500 text-sm w-1/4'>
                {t('Actions')}
              </span>
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
                          <span className='text-gray-800 line-clamp-2 text-sm max-w-[90%] mb-1'>
                            {purchase.product.name}
                          </span>
                          <span className='text-sm text-gray-500'>
                            {t('byType')}
                            {purchase.product.category.name}
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
                          if (value < 1) {
                            value = 1
                            setIsDialogProductRow(true)
                          }
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
                        onClick={() => setIsDialogProductRow(true)}
                      >
                        {t('Delete')}
                      </button>
                    </div>
                  </div>
                </div>
                <XDialog
                  isOpen={isDialogProductRow}
                  title={t('deleteProduct')}
                  message={t('deleteProductConfirm', {
                    name: purchase.product.name
                  })}
                  onCancel={handleCancel}
                  onConfirm={() => handleDelete(purchase._id)}
                  onCancelText={t('back')}
                  onConfirmText={t('yes')}
                />
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
                  {t('selectAll')} ({extendedPurchase.length})
                </button>
                <Button
                  className='ml-8'
                  onClick={handleDeleteManyPurchases}
                  disabled={checkedPurchase.length === 0}
                >
                  {t('Delete')}
                </Button>
              </div>
              <Popover
                placement='top-end'
                popoverContent={
                  checkedPurchase.length > 0 ? (
                    <div className='px-[30px] w-[550px] divide-y-0.5 divide-gray-200'>
                      <div className='text-xl py-6 font-medium '>
                        {t('discountDetail')}
                      </div>
                      <div className='text-sm'>
                        <div className='flex items-center justify-between py-[15px]'>
                          <span className='vxKt8Q'>{t('subtotal')}</span>
                          <span>{totalPurchase}</span>
                        </div>
                      </div>
                      <div className='py-[15px] text-sm'>
                        <div className='flex items-center justify-between'>
                          <span className='vxKt8Q'>{t('discountProduct')}</span>
                          <span className=''>-{discountPurchase}</span>
                        </div>
                      </div>
                      <div className='py-[15px] text-sm'>
                        <div className='flex items-center justify-between mb-2 font-medium'>
                          <span>{t('saved')}</span>
                          <span className='text-orange'>
                            -{discountPurchase}
                          </span>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='font-medium'>
                            {t('totalAmount')}
                          </span>
                          <span className='font-medium'>{totalPurchase}</span>
                        </div>
                        <div className='text-gray-400 text-xs flex justify-end mt-2'>
                          {t('* Final price shown at checkout')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                }
              >
                <div className='group'>
                  <div className='flex items-center'>
                    <span className='text-gray-700 mr-4'>
                      <span>{t('total')}</span> ({checkedPurchase.length}
                      <span> {t('product')}</span>):
                    </span>
                    <span className='flex items-center text-2xl text-orange ml-1'>
                      <span>{totalPurchase}</span>
                      {checkedPurchase.length > 0 && (
                        <div className='ml-3 group-hover:-rotate-180 transition-transform duration-300'>
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
                      )}
                    </span>
                  </div>
                  {extendedPurchase.some((purchase) => purchase.checked) && (
                    <div className='text-sm flex justify-end mt-2'>
                      {t('saved')}
                      <span className='text-orange pl-2.5'>
                        {discountPurchase}
                      </span>
                    </div>
                  )}
                </div>
              </Popover>

              <Button
                type='button'
                className='bg-orange text-white text-sm px-12 py-2 ml-6'
                onClick={handleBuyPurchase}
                disabled={
                  buyProductsMutation.isPending || checkedPurchase.length === 0
                }
              >
                {t('checkout')}
              </Button>
            </div>
          </div>
          <XDialog
            isOpen={isDialogOpen}
            title={t('deleteProduct')}
            message={t('deleteAllConfirm')}
            onCancel={handleCancelAllProducts}
            onConfirm={handleConfirm}
          />
          {isBuyProduct && <CustomToast message={t('buySuccess')} />}
        </>
      ) : (
        !isBuyProduct && (
          <>
            <div className='text-center p-[60px]'>
              <img
                className='w-[100px] h-[100px] mx-auto'
                src='../assets/images/empty-cart.png'
                alt='empty-cart'
              />
              <div className='text-sm text-gray-400 font-medium my-4'>
                {t('Your cart is empty')}
              </div>
              <Link
                to={path.home}
                className='bg-orange uppercase font-light text-white px-10 py-2'
              >
                {t('buyNow')}
              </Link>
            </div>
            {isFetching ? (
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                <ProductListSkeleton limit={LIMIT} />
              </div>
            ) : productsData.length > 0 ? (
              <>
                <div className='uppercase text-black text-opacity-[0.54] font-medium'>
                  {t('youMayAlsoLike')}
                </div>
                <div className='mt-6 mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                  {productsData.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </>
        )
      )}
    </>
  )
}
