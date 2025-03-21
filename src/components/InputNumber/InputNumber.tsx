import { forwardRef, InputHTMLAttributes } from 'react'

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
      onChange,
      ...rest
    }: InputNumberProps,
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
          className={classNameInput}
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
