import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form'

export interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute
  className?: string
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputV2Props) {
  const {
    type,
    onChange,
    className,
    classNameInput,
    classNameError,
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string | number>(field.value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    const numberCondition =
      type === 'number' &&
      (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      // Cập nhật localValue state
      setLocalValue(type === 'number' ? Number(valueFromInput) : valueFromInput)
      // Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(e)
      // Thực thi onChange callback từ ngoài truyền vào props
      if (onChange) {
        onChange(e)
      }
    }
  }

  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        {...field}
        {...rest}
        value={value || localValue}
        onChange={handleChange}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
