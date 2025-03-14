import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constant/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'
import 'src/components/Pagination/style.scss'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const currentPage = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='w-[40px] h-[30px] mx-[15px] flex justify-center items-center text-center text-black text-opacity-40 rounded-md cursor-pointer'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='w-[40px] h-[30px] mx-[15px]  rounded-md cursor-pointer'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array.from({ length: pageSize }, (_, index) => {
      const pageNumber = index + 1
      if (
        currentPage <= RANGE * 2 + 1 &&
        pageNumber > currentPage + RANGE &&
        pageNumber < pageSize - RANGE + 1
      ) {
        return renderDotAfter(index)
      } else if (
        currentPage > RANGE * 2 + 1 &&
        currentPage < pageSize - RANGE * 2
      ) {
        if (pageNumber < currentPage - RANGE && pageNumber > RANGE)
          return renderDotBefore(index)
        else if (
          pageNumber > currentPage + RANGE &&
          pageNumber < pageSize - RANGE + 1
        )
          return renderDotAfter(index)
      } else if (
        currentPage >= pageSize - RANGE * 2 &&
        pageNumber < currentPage - RANGE &&
        pageNumber > RANGE
      ) {
        return renderDotBefore(index)
      }

      return (
        <Link
          key={index}
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: pageNumber.toString()
            }).toString()
          }}
          className={`w-[40px] h-[30px] mx-[15px] flex justify-center items-center  text-center cursor-pointer ${
            currentPage === pageNumber
              ? 'bg-orange text-white text-opacity-100'
              : 'text-black text-opacity-40'
          }`}
        >
          {pageNumber}
        </Link>
      )
    })
  }

  return (
    <div className='flex mt-12 mb-[60px] justify-center text-[20px]'>
      {currentPage === 1 ? (
        <span className=' w-[40px] h-[30px] mx-[15px] flex justify-center items-center  text-center text-black text-opacity-40 not-allowed cursor-not-allowed'>
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x='0'
            y='0'
            className='shopee-svg-icon icon-arrow-left'
          >
            <g>
              <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
            </g>
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString()
            }).toString()
          }}
          className=' w-[40px] h-[30px] mx-[15px] flex justify-center items-center  text-center text-black text-opacity-40 cursor-pointer'
        >
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x='0'
            y='0'
            className='shopee-svg-icon icon-arrow-left'
          >
            <g>
              <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z'></path>
            </g>
          </svg>
        </Link>
      )}
      {renderPagination()}
      {currentPage === pageSize ? (
        <span className='w-[40px] h-[30px] mx-[15px] flex justify-center items-center  text-center text-black text-opacity-40 not-allowed cursor-not-allowed'>
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x='0'
            y='0'
            className='shopee-svg-icon icon-arrow-right'
          >
            <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z'></path>
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString()
            }).toString()
          }}
          className=' w-[40px] h-[30px] mx-[15px] flex justify-center items-center  text-center text-black text-opacity-40 cursor-pointer'
        >
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x='0'
            y='0'
            className='shopee-svg-icon icon-arrow-right'
          >
            <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z'></path>
          </svg>
        </Link>
      )}
    </div>
  )
}
