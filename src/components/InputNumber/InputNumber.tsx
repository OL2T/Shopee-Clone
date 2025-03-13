import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errors?: string
  className?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(
  function InputNumberInner(
    { type, errors, className, classNameError, onChange, ...rest }: InputProps,
    ref
  ) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(e)
      }
    }
    return (
      <div className={className}>
        <input
          type={type}
          className='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
          {...rest}
          ref={ref}
          onChange={handleChange}
        />
        <div className={classNameError}>{errors}</div>
      </div>
    )
  }
)
export default InputNumber
