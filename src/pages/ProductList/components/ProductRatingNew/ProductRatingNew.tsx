export default function ProductRatingNew({
  rating,
  activeClassname = 'h-3 w-3 fill-yellow-300 text-yellow-300',
  nonActiveClassname = 'h-3 w-3 fill-current text-gray-300'
}: {
  rating: number
  activeClassname?: string
  nonActiveClassname?: string
}) {
  return (
    <div className='flex items-center text-xs'>
      <div className='relative'>
        <div
          className='absolute top-0 left-0 h-full overflow-hidden'
          style={{ width: 100 }}
        >
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className={activeClassname}
          >
            <polygon
              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </svg>
        </div>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className={nonActiveClassname}
        >
          <polygon
            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit={10}
          />
        </svg>
      </div>
      <div>
        <span className='ml-1 text-xs'>{rating}</span>
      </div>
    </div>
  )
}
