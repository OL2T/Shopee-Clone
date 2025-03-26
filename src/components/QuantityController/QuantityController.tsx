import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  classNameQuantity?: string
}

export default function QuantityController({
  max,
  classNameWrapper = 'gap-x-4',
  classNameQuantity = 'text-sm text-gray-500',
  classNameInput = 'flex items-center justify-center text-center w-[50px] h-8 text-red-600 border-t border-b outline-none',
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  value,
  disabled,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const handleDecrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 0
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(e.target.value)
    onFocusOut && onFocusOut(_value)
    setLocalValue(_value)
  }
  return (
    <div
      className={`flex items-center ${disabled && 'opacity-60'} ${classNameWrapper}`}
    >
      <div className='flex items-center border-gray-300 text-gray-900'>
        <button
          className='flex items-center justify-center border w-8 h-8'
          onClick={handleDecrease}
          disabled={disabled}
        >
          <svg
            enableBackground='new 0 0 10 10'
            viewBox='0 0 10 10'
            x={0}
            y={0}
            className='w-2.5 h-2.5 text-[10px]'
          >
            <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
          </svg>
        </button>
        <InputNumber
          classNameInput={classNameInput}
          classNameError='hidden'
          value={value || localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        <button
          className='flex items-center justify-center w-8 h-8 border'
          onClick={handleIncrease}
          disabled={disabled}
        >
          <svg
            enableBackground='new 0 0 10 10'
            viewBox='0 0 10 10'
            x={0}
            y={0}
            className='w-2.5 h-2.5 text-[10px]'
          >
            <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
          </svg>
        </button>
      </div>
      <div className={classNameQuantity}> {max} sản phẩm có sẵn</div>
    </div>
  )
}
