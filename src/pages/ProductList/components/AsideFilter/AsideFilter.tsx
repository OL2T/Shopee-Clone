import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button/Button'
import path from 'src/constant/path'
import { Category } from 'src/types/category.type'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStars from '../RatingStar/RatingStar'
import { omit } from 'lodash'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import InputV2 from 'src/components/InputV2/InputV2'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
/**
 * Rule validate
 * Nếu có price_min và price_max thì price_max >= price_min
 * Còn không thì có price_min thì không có price_max và ngược lại
 */

type FormData = Pick<Schema, 'price_min' | 'price_max'>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const navigate = useNavigate()
  const { category } = queryConfig
  const {
    control,
    trigger,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: queryConfig.price_min || '',
      price_max: queryConfig.price_max || ''
    },
    resolver: yupResolver(priceSchema)
    // shouldFocusError: false
  })

  const onSubmit = handleSubmit(
    (data) => {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          ...(data.price_min && { price_min: data.price_min }),
          ...(data.price_max && { price_max: data.price_max })
          // price_min: data.price_min,
          // price_max: data.price_max
        }).toString()
      })
    }
    // (err) => {
    //   if (err.price_max?.ref?.focus) {
    //     err.price_max.ref.focus()
    //   }
    // }
  )

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, [
          'price_min',
          'price_max',
          'category',
          'rating_filter'
        ])
      ).toString()
    })
    reset({ price_min: '', price_max: '' })
  }

  return (
    <div className='py-4'>
      <div className='flex items-center font-bold text-lg  mb-6'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </div>
      <div>
        <Link
          to={path.home}
          className={`flex items-center font-bold ${
            !category ? 'text-orange' : ''
          }`}
        >
          <span className='text-sm'> Theo danh mục</span>
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <ul>
          {categories.map((categoryItem) => {
            const isActive = queryConfig.category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={`relative px-2 ${isActive ? 'text-orange font-semibold' : ''}`}
                >
                  {isActive && (
                    <svg
                      viewBox='0 0 4 7'
                      className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'
                    >
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link
          to={path.home}
          className='mt-4 flex items-center font-bold uppercase'
        >
          {/* {t('aside filter.filter search')} */}
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-5'>
          <div className='text-sm font-semibold text-gray-700 mb-4'>
            Khoảng giá
          </div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div
              className={`flex items-center ${!errors.price_min ? 'mb-4' : ''}`}
            >
              {/* <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='number'
                      className='grow'
                      placeholder='₫ TỪ'
                      classNameError='hidden'
                      {...field}
                      classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              /> */}
              <InputV2
                type='number'
                control={control}
                name='price_min'
                className='grow'
                placeholder='₫ TỪ'
                classNameError='hidden'
                classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                onChange={() => {
                  trigger('price_max')
                }}
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='number'
                      className='grow'
                      placeholder='₫ ĐẾN'
                      classNameError='hidden'
                      {...field}
                      classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                      onChange={(e) => {
                        field.onChange(e)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div
              className={`text-red-600 my-4 text-sm min-h-[1.25rem] text-center ${errors.price_min ? 'my-4' : 'hidden'}`}
            >
              {errors.price_min?.message}
            </div>
            <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='text-sm font-semibold text-gray-700 mb-4'>Đánh giá</div>
        <RatingStars queryConfig={queryConfig} />
        <div className='my-4 h-[1px] bg-gray-300' />
        <Button
          onClick={handleRemoveAll}
          className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}
