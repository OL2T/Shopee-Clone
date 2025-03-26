import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constant/path'
import EmptyPurchase from 'src/assets/images/empty-purchase.png'
import { purchaseStatus } from 'src/constant/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from 'src/apis/purchase.api'
import { PurChaseListStatus } from 'src/apis/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { Fragment } from 'react/jsx-runtime'
import Loading from 'src/components/Loading/Loading'
import delivering from 'src/assets/images/icon-shipping.svg'

const purchaseTabs = [
  { status: purchaseStatus.allProducts, name: 'Tất cả' },
  { status: purchaseStatus.inCart, name: 'Chờ thanh toán' },
  { status: purchaseStatus.waitForGettingPack, name: 'Vận chuyển' },
  { status: purchaseStatus.waitForDelivery, name: 'Chờ giao hàng' },
  { status: purchaseStatus.waitForConfirmation, name: 'Hoàn thành' },
  { status: purchaseStatus.canceled, name: 'Đã huỷ' }
]
const RATE = 4.5
export default function Purchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status = queryParams.status
    ? Number(queryParams.status)
    : purchaseStatus.allProducts

  const { data: cartData, isLoading } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () =>
      purchaseApi.getPurchases({ status: status as PurChaseListStatus })
  })

  const purchaseData = cartData?.data.data

  return (
    <div className='w-full relative  pl-6'>
      <div className='sticky top-0 bg-white rounded-t-[2px] w-full z-50'>
        <div className='flex items-center'>
          {purchaseTabs.map((tab) => (
            <Link
              key={tab.status}
              to={{
                pathname: path.purchase,
                search: createSearchParams({
                  status: String(tab.status)
                }).toString()
              }}
              className={`flex flex-1 items-center text-center justify-center w-full px-4 py-4 text-black text-opacity-80 border-b-2 ${
                status === tab.status
                  ? ' text-orange border-orange'
                  : 'border-gray-200'
              }`}
            >
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex items-center bg-[#eaeaea] py-3  my-3'>
        <svg
          width='19px'
          height='19px'
          viewBox='0 0 19 19'
          className='w-[19px] h-[19px] stroke-[#bbb] mx-[19px]'
        >
          <g id='Search-New' strokeWidth={1} fill='none' fillRule='evenodd'>
            <g
              id='my-purchase-copy-27'
              transform='translate(-399.000000, -221.000000)'
              strokeWidth={2}
            >
              <g id='Group-32' transform='translate(400.000000, 222.000000)'>
                <circle id='Oval-27' cx={7} cy={7} r={7} />
                <path
                  d='M12,12 L16.9799555,16.919354'
                  id='Path-184'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </g>
          </g>
        </svg>

        <input
          className='bg-transparent text-sm placeholder-gray-400  w-full focus:outline-none placeholder:text-sm'
          type='text'
          name='search'
          placeholder='Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : purchaseData?.length ? (
        <>
          {purchaseData.map((purchase) => {
            const isComplete =
              purchase.status === purchaseStatus.waitForConfirmation
            return (
              <Fragment key={purchase._id}>
                <div className='bg-white px-5 rounded-b-md border-b border-dotted border-gray-200'>
                  <div className='flex items-center justify-between py-4 border-b border-gray-200'>
                    <div className='flex items-center'>
                      {purchase.product.rating > RATE ? (
                        <div className='text-xs bg-orange text-white rounded-sm px-1 py-[3px] mr-2.5 inline-block '>
                          Yêu thích+
                        </div>
                      ) : (
                        <svg
                          width={17}
                          height={16}
                          viewBox='0 0 17 16'
                          className='mr-2'
                        >
                          <title>Shop Icon</title>
                          <path
                            d='M1.95 6.6c.156.804.7 1.867 1.357 1.867.654 0 1.43 0 1.43-.933h.932s0 .933 1.155.933c1.176 0 1.15-.933 1.15-.933h.984s-.027.933 1.148.933c1.157 0 1.15-.933 1.15-.933h.94s0 .933 1.43.933c1.368 0 1.356-1.867 1.356-1.867H1.95zm11.49-4.666H3.493L2.248 5.667h12.437L13.44 1.934zM2.853 14.066h11.22l-.01-4.782c-.148.02-.295.042-.465.042-.7 0-1.436-.324-1.866-.86-.376.53-.88.86-1.622.86-.667 0-1.255-.417-1.64-.86-.39.443-.976.86-1.643.86-.74 0-1.246-.33-1.623-.86-.43.536-1.195.86-1.895.86-.152 0-.297-.02-.436-.05l-.018 4.79zM14.996 12.2v.933L14.984 15H1.94l-.002-1.867V8.84C1.355 8.306 1.003 7.456 1 6.6L2.87 1h11.193l1.866 5.6c0 .943-.225 1.876-.934 2.39v3.21z'
                            strokeWidth='.3'
                            stroke='#333'
                            fill='#333'
                            fillRule='evenodd'
                          />
                        </svg>
                      )}
                      <div className='font-semibold uppercase text-black/80 text-sm'>
                        OFFICIAL STORE
                      </div>
                    </div>
                    <div className='flex items-center justify-end'>
                      {purchase.status ===
                        purchaseStatus.waitForConfirmation && (
                        <div className='flex items-center text-sm text-[#26AA99]'>
                          <img
                            alt='shipping entrance icon'
                            className='w-5 h-5 mr-2'
                            src={delivering}
                          />
                          <span>Giao hàng thành công</span>
                        </div>
                      )}
                      <div
                        className={`${isComplete ? 'border-l border-gray-200 pl-2 ml-2' : ''} text-orange text-sm uppercase`}
                      >
                        {purchase.status === purchaseStatus.inCart
                          ? 'Chờ thanh toán'
                          : purchase.status ===
                              purchaseStatus.waitForGettingPack
                            ? 'Vận chuyển'
                            : purchase.status === purchaseStatus.waitForDelivery
                              ? 'Chờ giao hàng'
                              : isComplete
                                ? 'Hoàn thành'
                                : 'Đã huỷ'}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 py-4 text-gray-500'>
                    <div className='flex items-center rounded-md'>
                      <div className='flex items-center flex-1'>
                        <Link
                          className='flex flex-1'
                          to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                        >
                          <div className='w-20 h-20 bg-white overflow-hidden mr-2 flex-shrink-0'>
                            <img
                              src={purchase.product.image}
                              alt={purchase.product.name}
                              className='w-full h-full border border-gray-200 object-cover'
                            />
                          </div>

                          <div className='flex flex-col flex-1'>
                            <span className='text-gray-800 text-sm line-clamp-2  mb-1'>
                              {purchase.product.name}
                            </span>
                            <span className='text-sm text-gray-500'>
                              Phân loại: {purchase.product.category.name}
                            </span>
                            <span className='text-sm text-gray-600'>
                              x{purchase.buy_count}
                            </span>
                          </div>
                        </Link>
                      </div>

                      <div className='flex items-center justify-between  text-center text-sm'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-400 line-through mr-2'>
                            {formatCurrency(purchase.price_before_discount)}
                          </span>
                          <span className='text-orange'>
                            {formatCurrency(purchase.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-[#fffefb] p-6 mb-3 rounded-t-md'>
                  <div className='flex items-center justify-end'>
                    <div className='text-sm text-gray-600 mr-2'>
                      Thành tiền:{' '}
                    </div>
                    <div className='text-orange text-2xl'>
                      {formatCurrency(purchase.price * purchase.buy_count)}
                    </div>
                  </div>
                  <div className='flex items-center justify-end mt-4'>
                    <Link
                      to={`${isComplete ? path.home + generateNameId({ name: purchase.product.name, id: purchase.product._id }) : path.cart}`}
                      className='inline-flex items-center justify-center rounded-sm bg-orange text-white text-sm text-center min-w-[150px] min-h-10 py-2 px2.5'
                    >
                      {isComplete ? 'Mua lại' : 'Thanh toán'}
                    </Link>
                  </div>
                </div>
              </Fragment>
            )
          })}
        </>
      ) : (
        <div className='bg-white h-[600px]'>
          <div className='no-data flex flex-col items-center justify-center h-full'>
            <img
              src={EmptyPurchase}
              alt={EmptyPurchase}
              className='w-[100px] h-[100px]'
            />
            <p className='text-center text-[#888] mt-5'>Chưa có đơn hàng</p>
          </div>
        </div>
      )}
    </div>
  )
}
