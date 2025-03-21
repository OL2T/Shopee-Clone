import { forwardRef, InputHTMLAttributes, useState } from 'react'

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute
  errors?: string
  className?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumberInner(
    {
      type,
      errors,
      className,
      classNameError,
      classNameInput,
      value = '',
      onChange,
      ...rest
    }: InputNumberProps,
    ref
  ) {
    const [localValue, setLocalValue] = useState(value as string)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(e)
      }
      setLocalValue(value)
    }

    return (
      <div className={className}>
        <input
          type={type}
          className={classNameInput}
          ref={ref}
          value={value || localValue}
          onChange={handleChange}
          {...rest}
        />
        <div className={classNameError}>{errors}</div>
      </div>
    )
  }
)
export default InputNumber
