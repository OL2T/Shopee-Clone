// import { type RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'
// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

// type Rules = {
//   [key in keyof FormData]?: RegisterOptions<FormData, key>
// }

// export const rules: Rules = {
//   email: {
//     required: {
//       value: true,
//       message: 'Email không được để trống'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     minLength: {
//       value: 5,
//       message: 'Email phải từ 5 ký tự trở lên'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Email có tối đa 160 ký tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password không được để trống'
//     },
//     minLength: {
//       value: 6,
//       message: 'Password phải từ 6 ký tự trở lên'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Password có tối đa 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Password không được để trống'
//     },
//     minLength: {
//       value: 6,
//       message: 'Password phải từ 6 ký tự trở lên'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Password có tối đa 160 ký tự'
//     },
//     validate: (value, context) => {
//       // Log the value and context to the console
//       // console.log('Confirm Password Value:', value)
//       // console.log('Form Context:', context)

//       // Perform the validation check
//       return value === context.password || 'Passwords không trùng khớp'
//     }
//   }
// }

export const schema = yup.object({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Email không được để trống')
    .min(5, 'Email phải từ 5 ký tự trở lên')
    .max(160, 'Email có tối đa 160 ký tự'),
  password: yup
    .string()
    .required('Password không được để trống')
    .min(6, 'Password phải từ 6 ký tự trở lên')
    .max(160, 'Password có tối đa 160 ký tự'),

  confirm_password: yup
    .string()
    .required('Confirm Password không được để trống')
    .min(6, 'Password phải từ 6 ký tự trở lên')
    .max(160, 'Password có tối đa 160 ký tự')
    .oneOf([yup.ref('password')], 'Passwords không trùng khớp')
})

// const loginSchema = schema.omit(['confirm_password'])
// type LoginSchema = yup.InferType<typeof loginSchema>
export type Schema = yup.InferType<typeof schema>
