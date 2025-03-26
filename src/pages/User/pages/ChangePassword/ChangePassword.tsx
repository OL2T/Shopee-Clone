import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import userAPI from 'src/apis/user.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseAPI } from 'src/types/utils.type'
import CustomToast from 'src/components/CustomToast/CustomToast'
import { useState } from 'react'

type FormData = Pick<
  UserSchema,
  'password' | 'new_password' | 'confirm_password'
>

const changePasswordSchema = userSchema.pick([
  'password',
  'new_password',
  'confirm_password'
])

export default function ChangePassword() {
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
  const {
    register,
    reset,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const transformedData = {
        password: data.password as string,
        new_password: data.new_password as string
      }
      await updateProfileMutation.mutateAsync(transformedData, {
        onSuccess: () => {
          setIsUpdateSuccess(true)
          setTimeout(() => {
            reset()
            setIsUpdateSuccess(false)
          }, 2000)
        }
      })
    } catch (error) {
      if (isUnprocessableEntityError<ErrorResponseAPI<FormData>>(error)) {
        const formErrors = error.response?.data.data
        if (formErrors) {
          Object.keys(formErrors).forEach((key) => {
            setError(key as keyof FormData, {
              message: String(formErrors[key as keyof FormData]),
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='flex-1 bg-white rounded shadow p-6'>
      <div className='border-b border-gray-200 pb-4 mb-5'>
        <h1 className='text-xl font-medium mb-2'>Đổi mật khẩu</h1>
      </div>

      <form className='text-sm flex' onSubmit={onSubmit}>
        <div className='space-y-5 flex-1 max-w-2xl'>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600 mb-5'>
              Nhập mật khẩu cũ
            </div>
            <Input
              name='password'
              type='password'
              className='w-full h-[58px]'
              register={register}
              placeholder='Nhập mật khẩu cũ'
              errors={errors.password?.message}
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
            />
          </div>

          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600 mb-5'>
              Nhập mật khẩu mới
            </div>
            <Input
              name='new_password'
              type='password'
              className='w-full h-[58px]'
              register={register}
              placeholder='Nhập mật khẩu mới'
              errors={errors.new_password?.message}
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
            />
          </div>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600 mb-5'>
              Xác nhận mật khẩu
            </div>
            <Input
              name='confirm_password'
              type='password'
              className='w-full h-[58px]'
              register={register}
              placeholder='Xác nhận mật khẩu'
              errors={errors.confirm_password?.message}
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
            />
          </div>

          <div className='flex items-center'>
            <div className='opacity-0 text-right mr-5 w-1/4 text-gray-600 mb-5'>
              Lưu
            </div>

            <div className='w-full'>
              <Button
                type='submit'
                className='px-6 py-2 bg-orange text-white'
                disabled={updateProfileMutation.isPending}
                isLoading={updateProfileMutation.isPending}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>

      {isUpdateSuccess && <CustomToast message='Cập nhật thành công' />}
    </div>
  )
}
