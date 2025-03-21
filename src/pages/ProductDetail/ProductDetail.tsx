import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productAPI from 'src/apis/product.api'
import {
  formatCurrency,
  formatDifferencePriceToPercent,
  formatNumberToSocialStyle,
  getIdFromNameId
} from '../../utils/utils'
import ProductRating from '../ProductList/components/ProductRating/ProductRating'
import DOMPurify from 'dompurify'
import XListView, { ListItem } from 'src/components/XListView/XListView'
import Popover from 'src/components/Popover'
import 'src/pages/ProductDetail/styles.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import Loading from 'src/components/Loading/Loading'
import { ProductListConfig } from 'src/types/product.type'
import Product from '../ProductList/components/Product/Product'
import Button from 'src/components/Button/Button'
import { LIMIT } from 'src/constant/product'
import QuantityController from 'src/components/QuantityController/QuantityController'
export default function ProductDetail() {
  const [productQuantity, setProductQuantity] = useState(1)
  const { nameId } = useParams()

  const id = getIdFromNameId(nameId as string)
  const { data, isFetching } = useQuery({
    queryKey: ['productPk', id],
    queryFn: () => {
      if (id) {
        return productAPI.getProductById(id)
      }
    }
  })
  const productData = data?.data.data
  const queryConfig: ProductListConfig = {
    page: 1,
    limit: LIMIT,
    category: productData?.category?._id
  }

  const {
    data: productDataByCategory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['products', queryConfig],
    queryFn: ({ pageParam }) =>
      productAPI.getProducts({ ...queryConfig, page: pageParam as number }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.data.products.length === LIMIT
        ? pages.length + 1
        : undefined
    },
    initialPageParam: 1,
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productData)
  })

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
    shipping: 'Nhận vào ngày mai, phí giao ₫0',
    quantity: productData?.quantity || 0
  }

  const clothesId = '60aba4e24efcc70f8892e1c6'
  const isFavorite = valueData.rating && valueData.rating > 4.5

  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const currentImages = useMemo(() => {
    return valueData.images?.slice(...currentIndexImage)
  }, [valueData.images, currentIndexImage])
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (valueData.images && valueData.images.length) {
      setActiveImage(valueData.images[0])
    }
  }, [valueData.images])

  const handleSelectImage = (image: string) => {
    setActiveImage(image)
  }

  const next = () => {
    if (valueData.images && currentIndexImage[1] < valueData.images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (valueData.images && currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoomImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    // Cach 1
    // Event bubble => error
    const { offsetX, offsetY } = e.nativeEvent
    // Cach 2 => không cần xử lý event bubble
    // const offsetX = e.pageX - (rect.left + window.scrollX)
    // const offsetY = e.pageY - (rect.top + window.scrollY)
    const { naturalHeight, naturalWidth } = image
    const left = offsetX * (1 - naturalWidth / rect.width)
    const top = offsetY * (1 - naturalHeight / rect.height)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.left = `${left}px`
    image.style.top = `${top}px`
  }

  const handleZoomOutImage = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const handleBuyCount = (value: number) => {
    setProductQuantity(value)
  }

  const dataGeneral = [
    {
      title: 'Vận chuyển',
      align: 'start' as ListItem['align'],
      value: () => (
        <>
          <span className='flex items-center gap-x-2'>
            <img
              alt='shipping entrance icon'
              className='w-5 h-5'
              src='../assets/images/icon-shipping.svg'
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
          <img
            src='../assets/images/icon-guard.svg'
            alt='shopee-guard'
            className='w-5 h-5'
          />
          <Popover
            placement='bottom-start'
            popoverContent={
              <div className='text-sm text-gray-600 p-5 border border-neutral-100 rounded-sm max-w-[515px]'>
                <div className='font-bold text-gray-900 pb-3 border-b border-gray-300'>
                  An tâm mua sắm cùng Shopee
                </div>
                <div className='flex gap-x-3 pt-5'>
                  <img
                    src='../assets/images/icon-guard-2.png'
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
    {
      title: 'Số lượng',
      value: () => (
        <QuantityController
          value={productQuantity}
          onIncrease={handleBuyCount}
          onDecrease={handleBuyCount}
          onType={handleBuyCount}
          max={valueData.quantity}
        />
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
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <div className='bg-white rounded-sm mb-4'>
            {valueData && (
              <div className='mx-auto'>
                <div className='flex flex-col md:flex-row'>
                  {/* <------ Content Left ------> */}
                  <div className='w-full md:w-[480px] flex-shrink-0 p-[15px]'>
                    <div className=' flex flex-col items-center'>
                      <div
                        className='relative w-full pt-[100%] mb-2.5 overflow-hidden hover:cursor-zoom-in'
                        onMouseMove={(e) => handleZoomImage(e)}
                        onMouseLeave={handleZoomOutImage}
                      >
                        <img
                          src={activeImage}
                          alt={valueData.name}
                          className=' absolute pointer-events-none left-0 top-0 w-full h-auto object-cover'
                          ref={imageRef}
                        />
                      </div>

                      <div className='relative flex w-full gap-x-2.5'>
                        <button
                          className='absolute top-1/2 left-0 transform -translate-y-1/2 w-5 h-10 bg-black bg-opacity-20 flex justify-center items-center'
                          tabIndex={-1}
                          onClick={prev}
                        >
                          <img
                            alt='icon arrow left bold'
                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/5914c85bab254a6705bd.svg'
                          />
                        </button>

                        {currentImages?.slice(0, 5).map((image, index) => {
                          const isActive = image === activeImage
                          return (
                            <div
                              key={index}
                              className={`border-2 ${isActive ? 'border-orange' : 'border-transparent'}`}
                              onMouseEnter={() => handleSelectImage(image)}
                            >
                              <img
                                src={image}
                                alt={valueData.name}
                                className='w-[82px] h-[82px] object-cover cursor-pointer'
                              />
                            </div>
                          )
                        })}

                        <button
                          className='absolute top-1/2 right-0 transform -translate-y-1/2 w-5 h-10 bg-black bg-opacity-20 flex justify-center items-center'
                          tabIndex={-1}
                          onClick={next}
                        >
                          <img
                            alt='icon arrow right bold'
                            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/7e05bc64eb8a25d287c5.svg'
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <------ Content Right ------> */}
                  <div className='w-full p-[15px] md:p-5'>
                    <div className='flex flex-col'>
                      <div className='text-xl font-medium text-gray-800 mb-2'>
                        <div>
                          {isFavorite && (
                            <div className='text-xs bg-orange text-white rounded-sm px-1 py-[3px] mr-2.5 inline-block  -translate-y-[2px]'>
                              Yêu thích+
                            </div>
                          )}
                          <span>{valueData.name}</span>
                        </div>
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
                          <span className='text-sm text-gray-600'>
                            Lượt xem
                          </span>
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
                      <XListView dataView={dataGeneral} />
                      <div className='flex items-center space-x-3 mb-4'>
                        <button className='flex items-center text-sm gap-x-2 border border-orange min-w-[180px] max-w-[250px] text-orange px-5 py-3 h-[48px] rounded-sm bg-orange bg-opacity-10 hover:bg-opacity-5'>
                          <img
                            src='../assets/images/icon-cart.svg'
                            alt='icon-cart'
                            className='w-5 h-5'
                          />
                          <span>Thêm vào giỏ hàng</span>
                        </button>
                        <button className='bg-orange px-5 py-3 h-[48px] text-white min-w-[180px] max-w-[250px] hover:bg-opacity-90 rounded-sm'>
                          Mua ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
          <div className='mt-10'>
            <div className='uppercase text-gray-500 font-semibold'>
              Các sản phẩm bạn có thể thích
            </div>
            {!productDataByCategory ? (
              <Loading />
            ) : (
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                {productDataByCategory.pages.flatMap((page) =>
                  page.data.data.products
                    .filter((product) => product._id !== productData?._id)
                    .map((product) => (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product} />
                      </div>
                    ))
                )}
              </div>
            )}
            <div className='flex justify-center mt-6'>
              {hasNextPage && (
                <Button
                  className='text-sm text-gray-600 border bg-white h-10 max-w-[220px] min-w-[70px] px-5 py-2'
                  onClick={handleLoadMore}
                >
                  {isFetchingNextPage ? 'Đang tải...' : 'Xem Thêm'}
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
