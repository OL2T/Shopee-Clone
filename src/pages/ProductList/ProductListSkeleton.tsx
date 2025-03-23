import { LIMIT } from 'src/constant/product'

interface ProductListSkeletonProps {
  limit?: number
}

export default function ProductListSkeleton({
  limit = LIMIT
}: ProductListSkeletonProps) {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <div
          key={index}
          role='status'
          className='max-w-sm border border-gray-200 rounded-sm shadow-sm animate-pulse'
        >
          <div className='flex items-center justify-center h-[164px] bg-gray-300 rounded-sm '>
            <svg
              className='w-10 h-10 text-gray-200 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 16 20'
            >
              <path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
              <path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
            </svg>
          </div>
          <div className='overflow-hidden p-2 h-[107px]'>
            <div className='min-h-[2rem] text-sm line-clamp-2 bg-gray-300 rounded-sm'></div>
            <div className='mt-1 flex items-center'>
              <div className='flex items-center gap-1 truncate text-orange font-medium'>
                <div className='bg-gray-300 rounded-sm text-gray-300'>
                  <span className='text-sm'>₫</span>
                  <span>3.190.000</span>
                </div>
                <div className='text-[10px] bg-gray-300 text-gray-300 p-1 rounded-sm'>
                  -20%
                </div>
              </div>
            </div>
            <div className='mt-3 flex items-center bg-gray-300 rounded-sm text-gray-300'>
              <span className='ml-1 h-[10px] scale-x-50 border-l border-black-900' />
              <div className='ml-1 text-xs'>
                <span className='mr-1'>Đã bán</span>
                <span>1,2k</span>
              </div>
            </div>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ))}
    </>
  )
}
