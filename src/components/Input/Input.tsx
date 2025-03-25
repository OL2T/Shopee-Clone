/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  confirm_password: string
  classNameInput: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  register?: UseFormRegister<any>
  rules?: RegisterOptions<FormData>
  errors?: string
  placeholder?: string
  className?: string
  name: string
  autoComplete?: string
  classNameInput?: string
}

export default function Input({
  type,
  register,
  rules,
  errors,
  className,
  classNameInput = 'bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm',
  name,
  ...rest
}: InputProps) {
  return (
    <div className={className}>
      <input
        {...(register ? register(name, rules) : {})}
        type={type}
        className={classNameInput}
        {...rest}
      />
      <span className='mt-1 text-sm min-h-[1.25rem] text-red-600'>
        {errors}
      </span>
    </div>
  )
}
