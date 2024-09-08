/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

interface InputProps {
  type: React.HTMLInputTypeAttribute
  register: UseFormRegister<any>
  rules?: RegisterOptions<FormData>
  errors?: string
  placeholder?: string
  className?: string
  name: string
  autoComplete?: string
}

export default function Input({
  type,
  register,
  rules,
  errors,
  placeholder,
  className,
  name,
  autoComplete
}: InputProps) {
  return (
    <div className={className}>
      <input
        {...register(name, rules)}
        type={type}
        className='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-sm min-h-[1.25rem] text-red-600'>{errors}</div>
    </div>
  )
}