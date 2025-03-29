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
import Loading from 'src/components/Loading/Loading'
import { Helmet } from 'react-helmet-async'

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
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
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
      <div className='container'>
        <Helmet>
          <title>Trang chủ | Shopee Clone</title>
          <meta name='description' content='Trang chủ dự án Shopee Clone' />
        </Helmet>
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
              <Loading />
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
