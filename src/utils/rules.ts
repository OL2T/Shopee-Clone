import { type RegisterOptions } from 'react-hook-form'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

type Rules = {
  [key in keyof FormData]?: RegisterOptions<FormData, key>
}

export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    minLength: {
      value: 5,
      message: 'Email phải từ 5 ký tự trở lên'
    },
    maxLength: {
      value: 160,
      message: 'Email phải nhỏ hơn 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    minLength: {
      value: 5,
      message: 'Password phải từ 5 ký tự trở lên'
    },
    maxLength: {
      value: 160,
      message: 'Password phải nhỏ hơn 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    minLength: {
      value: 5,
      message: 'Password phải từ 5 ký tự trở lên'
    },
    maxLength: {
      value: 160,
      message: 'Password phải nhỏ hơn 160 ký tự'
    },
    validate: (value, context) =>
      value === context.password || 'Passwords không trùng khớp'
  }
}
