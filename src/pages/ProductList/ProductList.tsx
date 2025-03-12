import AsideFilter from './components/AsideFilter/AsideFilter'
import SortProductList from './components/SortProductList/SortProductList'
import {
  keepPreviousData,
  useIsFetching,
  useQuery
} from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productAPI from 'src/apis/product.api'
import Product from './components/Product/Product'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'
import ProductListSkeleton from './ProductListSkeleton'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const isLoading = useIsFetching() ? true : false
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 8,
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )

  const data = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productAPI.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const productsData = data.data?.data.data.products || []
  const paginationData = data.data?.data.data.pagination

  // Temporary mock data for categories
  const categoriesData = {
    data: {
      data: []
    }
  }

  return (
    <div className=' py-6  container'>
      {/* <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone' />
      </Helmet> */}
      {data ? (
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter
                queryConfig={queryConfig}
                categories={categoriesData?.data.data || []}
              />
            </div>
            <div className='col-span-9'>
              <SortProductList
                queryConfig={queryConfig}
                pageSize={paginationData?.page_size || 1}
              />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {isLoading && <ProductListSkeleton />}
                {productsData.map(
                  (product) =>
                    !isLoading && (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product} />
                      </div>
                    )
                ) || []}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={paginationData?.page_size || 1}
              />
            </div>
          </div>
        </div>
      ) : (
        <>Không có dữ liệu</>
      )}
    </div>
  )
}
