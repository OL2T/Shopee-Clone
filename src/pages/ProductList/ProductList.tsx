import { useMemo } from 'react'
import AsideFilter from './components/AsideFilter/AsideFilter'
import { useSearchParams } from 'react-router-dom'
import SortProductList from './components/SortProductList/SortProductList'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productAPI from 'src/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const data = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productAPI.getProducts(queryParams)
    }
  })

  console.log('data', data)
  const [searchParams] = useSearchParams()
  const queryConfig = useMemo(() => {
    const params = Object.fromEntries([...searchParams])
    return {
      page: params.page || '1',
      limit: params.limit || '20',
      sort_by: params.sort_by || 'createdAt',
      category: params.category,
      exclude: params.exclude,
      rating_filter: params.rating_filter,
      price_max: params.price_max,
      price_min: params.price_min,
      name: params.name
    }
  }, [searchParams])

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
            // queryConfig={queryConfig}
            // pageSize={productsData.data.data.pagination.page_size}
            />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {/* {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))} */}
            </div>
            {/* <Pagination
              queryConfig={queryConfig}
              pageSize={productsData.data.data.pagination.page_size}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
