import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errors?: string
  className?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputProps>(
  function InputNumberInner(
    {
      type,
      errors,
      className,
      classNameError,
      classNameInput,
      onChange,
      ...rest
    }: InputProps,
    ref
  ) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      console.log('inputValue', value)
      console.log('inputValue', /^\d+$/.test(value))
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(e)
      }
    }
    const inputValue =
      typeof rest.value === 'number' && isNaN(rest.value) ? '' : rest.value
    return (
      <div className={className}>
        <input
          type={type}
          className={classNameInput}
          {...rest}
          value={inputValue}
          ref={ref}
          onChange={handleChange}
        />
        <div className={classNameError}>{errors}</div>
      </div>
    )
  }
)
export default InputNumber
