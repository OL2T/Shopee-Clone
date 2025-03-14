import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productAPI from 'src/apis/product.api'
import {
  formatCurrency,
  formatDifferencePriceToPercent,
  formatNumberToSocialStyle
} from '../../utils/utils'
import ProductRating from '../ProductList/components/ProductRating/ProductRating'
import DOMPurify from 'dompurify'
import XListView, { ListItem } from 'src/components/XListView/XListView'
import Popover from 'src/components/Popover'
import 'src/pages/ProductDetail/styles.scss'
export default function ProductDetail() {
  const params = useParams()
  const data = useQuery({
    queryKey: ['productPk', params.id],
    queryFn: () => {
      if (params.id) {
        return productAPI.getProductById(params.id)
      }
    }
  })
  const productData = data.data?.data.data
  const readDescription = (description: string) => {
    return (
      <div
        className='product-detail-description text-sm text-gray-700 mx-4'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    )
  }
  const valueData = {
    ...productData,
    description: productData?.description || '',
    shipping: 'Nhận vào ngày mai, phí giao ₫0'
  }
  console.log('valueData', valueData)
  const clothesId = '60aba4e24efcc70f8892e1c6'
  const dataGeneral = [
    {
      title: 'Vận chuyển',
      align: 'start' as ListItem['align'],
      value: () => (
        <>
          <span className='flex items-center gap-x-2'>
            <img
              alt='shipping entrance icon'
              className='snjEjZ'
              src='../src/assets/images/icon-shipping.svg'
            />

            <span className='text-gray-900'> {valueData.shipping}</span>
          </span>
          <div className='text-xs text-gray-500'>
            Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.
          </div>
        </>
      )
    },
    {
      title: 'An tâm mua sắm cùng Shopee',
      value: () => (
        <div className='flex items-center gap-x-1'>
          <img src='../src/assets/images/icon-guard.svg' alt='shopee-guard' />
          <Popover
            placement='bottom-start'
            popoverContent={
              <div className='text-sm text-gray-600 p-5 border border-neutral-100 rounded-sm max-w-[515px]'>
                <div className='font-bold text-gray-900 pb-3 border-b border-gray-300'>
                  An tâm mua sắm cùng Shopee
                </div>
                <div className='flex gap-x-3 pt-5'>
                  <img
                    src='../src/assets/images/icon-guard-2.png'
                    alt='shopee-guard-2'
                    className='w-6 h-6'
                  />
                  <div className=''>
                    <div className='font-bold text-gray-900 mb-1'>
                      Trả hàng miễn phí 15 ngày
                    </div>
                    <div className='text-xs'>
                      Miễn phí Trả hàng trong 15 ngày để đảm bảo bạn hoàn toàn
                      có thể yên tâm khi mua hàng ở Shopee. Ngoài ra, tại thời
                      điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng miễn
                      phí.
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <div className='flex items-center gap-x-1'>
              <span>Trả hàng miễn phí 15 ngày</span>
              <svg
                viewBox='0 0 12 12'
                fill='none'
                width={12}
                height={12}
                color='#ee4d2d'
                className='text-gray-900'
                style={{}}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Popover>
        </div>
      )
    },
    // {
    //   title: 'Kho',
    //   value: () => valueData.quantity
    // },
    {
      title: 'Số lượng',
      value: () => (
        <div className='flex items-center gap-x-4'>
          <div className='flex items-center border-gray-300 text-gray-300'>
            <button className='border w-8 h-8 '>-</button>
            <input
              type='number'
              min={1}
              defaultValue={1}
              className='w-10 h-8 text-center border-t border-b text-red-600'
            />
            <button className='w-8 h-8 border '>+</button>
          </div>
          <div className='text-sm text-gray-500'>
            {valueData.quantity} sản phẩm có sẵn
          </div>
        </div>
      )
    }
  ]

  const dataDetail = [
    {
      title: 'Danh mục',
      value: () => valueData.category?.name
    },
    {
      title: 'Số sản phẩm còn lại',
      value: () => valueData.quantity
    },
    ...(valueData?.category?._id !== clothesId
      ? [
          { title: 'Hạn bảo hành', value: () => '12 tháng' },
          {
            title: 'Loại bảo hành',
            value: () => 'Bảo hành nhà sản xuất'
          }
        ]
      : [])
  ]
  return (
    <>
      <div className='bg-white rounded-sm mb-4'>
        {valueData && (
          <div className=' mx-auto p-4'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='w-full md:w-1/2'>
                <div className='flex flex-col items-center'>
                  <div className='mb-4'>
                    <img
                      src={valueData.image}
                      alt='Main product'
                      className='w-full h-auto object-cover rounded-md'
                    />
                  </div>

                  <div className='flex space-x-2'>
                    {valueData.images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt='Thumbnail product'
                        className='w-16 h-16 object-cover rounded-md'
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/2'>
                <div className='flex flex-col'>
                  <div className='text-xl font-medium text-gray-800 mb-2'>
                    {valueData.name}
                  </div>
                  <div className='flex items-center mb-2.5'>
                    <span className='flex items-center '>
                      <span className='border-b border-black mr-1'>
                        {valueData.rating?.toFixed(1)}
                      </span>
                      <ProductRating rating={valueData.rating || 0} />
                    </span>
                    <span className=' border-r border-l mx-4 px-4'>
                      <span className='border-b border-black mr-1'>
                        {formatNumberToSocialStyle(valueData.view || 0)}
                      </span>
                      <span className='text-sm text-gray-600'>Lượt xem</span>
                    </span>
                    <span className=''>
                      <span className='border-b border-black mr-1'>
                        {formatNumberToSocialStyle(valueData.sold || 0)}
                      </span>
                      <span className='text-sm text-gray-600'>Sold</span>
                    </span>
                  </div>

                  <div className='flex items-center mb-3 px-5 py-[15px] bg-neutral-50 px'>
                    <span className='text-2xl font-semibold text-red-600 mr-3'>
                      ₫{formatCurrency(valueData.price || 0)}
                    </span>
                    <span className='text-gray-400 line-through mr-2'>
                      {formatCurrency(valueData.price_before_discount || 0)}
                    </span>
                    <span className='bg-[rgba(254,238,234,1)] text-orange text-sm px-2 py-1 rounded'>
                      {formatDifferencePriceToPercent(
                        valueData.price_before_discount || 0,
                        valueData.price || 0
                      )}
                    </span>
                  </div>

                  {/* <p className='text-gray-700 mb-4'>
                    Viên thả bồn cầu CleanZ giúp sạch khuẩn, khử mùi và làm
                    thơm. Thích hợp cho mọi loại bồn cầu...
                  </p> */}
                  <XListView dataView={dataGeneral} />
                  {/* Chọn số lượng */}
                  {/* <div className='flex items-center mb-4'>
                    <span className='mr-3 text-gray-600'>Số lượng</span>
                    
                  </div> */}
                  {/* Nút Mua & Thêm giỏ hàng */}
                  <div className='flex items-center space-x-3 mb-4'>
                    <button className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition'>
                      Mua ngay
                    </button>
                    <button className='border border-red-500 text-red-500 px-6 py-2 rounded-md hover:bg-red-50 transition'>
                      Thêm vào giỏ
                    </button>
                  </div>
                  {/* Chia sẻ / Lưu */}
                  <div className='flex items-center space-x-4'>
                    <button className='text-gray-500 flex items-center hover:text-gray-700 transition'>
                      {/* icon share */}
                      <svg
                        className='w-5 h-5 mr-1'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M18 8l4 4m0 0l-4 4m4-4H6m6 4v1a3 3 0 11-6 0v-1a3 3 0 016 0z'
                        />
                      </svg>
                      Chia sẻ
                    </button>
                    <button className='text-gray-500 flex items-center hover:text-gray-700 transition'>
                      {/* icon heart */}
                      <svg
                        className='w-5 h-5 mr-1'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z'
                        />
                      </svg>
                      Đã thích (6,6k)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* (Tuỳ chọn) Thêm khu vực mô tả dài, đánh giá khách hàng... */}
            {/* ... */}
          </div>
        )}
      </div>
      <div className='bg-white rounded-sm p-2.5'>
        <div className='p-4'>
          <div className='bg-neutral-50 text-xl uppercase mb-4 p-4 rounded-sm'>
            Chi tiết sản phẩm
          </div>
          <div className='mx-4'>
            <XListView dataView={dataDetail}></XListView>
          </div>
          <div className=''>
            <div className='bg-neutral-50 text-xl uppercase mb-4 p-4 rounded-sm'>
              Mô tả sản phẩm
            </div>
            {readDescription(valueData?.description || '')}
          </div>
        </div>
      </div>
    </>
  )
}
