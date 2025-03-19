import AsideFilter from './components/AsideFilter/AsideFilter'
import SortProductList from './components/SortProductList/SortProductList'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productAPI from 'src/apis/product.api'
import Product from './components/Product/Product'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import ProductListSkeleton from './ProductListSkeleton'
import categoriesAPI from '../../apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const {
    data: productsResponse,
    isLoading: productsLoading,
    isError: productsError,
    isFetching
  } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productAPI.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const categoriesData = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoriesAPI.getCategories()
    }
  })

  const productsData = productsResponse?.data?.data.products || []
  const paginationData = productsResponse?.data?.data.pagination

  return (
    <>
      {/* <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone' />
      </Helmet> */}

      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter
              queryConfig={queryConfig}
              categories={categoriesData?.data?.data.data || []}
            />
          </div>
          <div className='col-span-9'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={paginationData?.page_size || 1}
            />
            {productsLoading ? (
              <div className='flex justify-center text-center py-6'>
                <svg
                  aria-hidden='true'
                  className='w-10 h-10 text-gray-200 animate-spin  fill-orange'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              </div>
            ) : productsError ? (
              <div className='flex justify-center text-center py-6'>
                Đã xảy ra lỗi khi tải sản phẩm.
              </div>
            ) : isFetching ? (
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                <ProductListSkeleton />
              </div>
            ) : productsData.length > 0 ? (
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex justify-center text-center py-6'>
                Không có dữ liệu
              </div>
            )}
            <Pagination
              queryConfig={queryConfig}
              pageSize={paginationData?.page_size || 1}
              disabled={isFetching}
            />
          </div>
        </div>
      </div>
    </>
  )
}
