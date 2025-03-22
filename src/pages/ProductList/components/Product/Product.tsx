import { Link } from 'react-router-dom'
import path from 'src/constant/path'
import { Product as ProductType } from 'src/types/product.type'
import {
  formatCurrency,
  formatDifferencePriceToPercent,
  formatNumberToSocialStyle,
  generateNameId
} from 'src/utils/utils'
import ProductRatingNew from '../ProductRatingNew/ProductRatingNew'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link
      to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
    >
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-sm line-clamp-2'>
            {product.name}
          </div>
          <div className='mt-1 flex items-center'>
            <div className='flex items-center gap-1 truncate text-orange font-medium'>
              <span>{formatCurrency(product.price)}</span>
              <div className='text-[10px] bg-[rgba(254,238,234,1)] p-1 rounded-sm'>
                {formatDifferencePriceToPercent(
                  product.price_before_discount,
                  product.price
                )}
              </div>
            </div>
          </div>
          <div className='mt-3 flex items-center'>
            <ProductRatingNew rating={product.rating} />
            <span className='ml-1 h-[10px] scale-x-50 border-l border-black-900' />
            <div className='ml-1 text-xs'>
              <span className='mr-1'>Đã bán</span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
