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

const yupHandleConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Confirm Password không được để trống')
    .min(6, 'Password phải từ 6 ký tự trở lên')
    .max(160, 'Password có tối đa 160 ký tự')
    .oneOf([yup.ref(refString)], 'Passwords không trùng khớp')
}

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

  confirm_password: yupHandleConfirmPassword('password'),

  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: function (value) {
      const price_max = this.parent.price_max
      if (value !== '' && price_max !== '') {
        return Number(value) <= Number(price_max)
      }
      return value !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function (value) {
      const price_min = this.parent.price_min
      if (value !== '' && price_min !== '') {
        return Number(price_min) <= Number(value)
      }
      return value !== '' || price_min !== ''
    }
  }),
  name: yup.string()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Tên có tối đa 160 ký tự'),
  phone: yup.string().max(20, 'Số điện thoại có tối đa 20 ký tự'),
  address: yup.string().max(160, 'Địa chỉ có tối đa 160 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Ngày sinh không hợp lệ'),
  avatar: yup.string().max(1000, 'Avatar có tối đa 1000 ký tự'),
  password: schema.fields['password'] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
  new_password: schema.fields['password'] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ''
  >,
  confirm_password: yupHandleConfirmPassword('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
