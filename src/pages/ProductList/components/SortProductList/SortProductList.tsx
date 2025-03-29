import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { sortBy, order as orderConstant } from 'src/constant/product'
import { ProductListConfig } from 'src/types/product.type'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { t } = useTranslation(['home'])
  const navigate = useNavigate()
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig

  const handleIsActiveSortBy = (
    sortByValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    return sort_by === sortByValue
      ? 'bg-orange text-white hover:bg-orange/80'
      : 'bg-white text-black hover:bg-slate-100'
  }

  const handleSortBy = (
    sortByValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (
    orderValue: Exclude<ProductListConfig['order'], undefined>
  ) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-black/[0.03] py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='text-sm'>{t('home:sort.sortBy')}</div>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${handleIsActiveSortBy(sortBy.view)}`}
            onClick={() => handleSortBy(sortBy.view)}
          >
            {t('home:sort.popular')}
          </button>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${handleIsActiveSortBy(sortBy.createdAt)}`}
            onClick={() => handleSortBy(sortBy.createdAt)}
          >
            {t('home:sort.newest')}
          </button>
          <button
            className={`h-8 px-4 text-center text-sm capitalize ${handleIsActiveSortBy(sortBy.sold)}`}
            onClick={() => handleSortBy(sortBy.sold)}
          >
            {t('home:sort.bestSeller')}
          </button>
          <select
            className={`h-8 px-4 text-center text-sm capitalize ${handleIsActiveSortBy(sortBy.price)}`}
            value={order || ''}
            onChange={(e) =>
              handlePriceOrder(
                e.target.value as Exclude<ProductListConfig['order'], undefined>
              )
            }
          >
            <option value='' disabled className='bg-white text-black'>
              {t('home:sort.price')}
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              {t('home:sort.priceLowToHigh')}
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              {t('home:sort.priceHighToLow')}
            </option>
          </select>
        </div>

        <div className='flex items-center text-sm'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60 shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
