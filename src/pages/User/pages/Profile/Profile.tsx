import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userAPI from 'src/apis/user.api'
import Button from 'src/components/Button/Button'
import CustomToast from 'src/components/CustomToast/CustomToast'
import DateSelect from 'src/components/DateSelect/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { AppContext } from 'src/Contexts/app.context'
import { setUserToLocalStorage } from 'src/types/auth'
import { userSchema, UserSchema } from 'src/utils/rules'

type FormData = Pick<
  UserSchema,
  'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'
>

const profileSchema = userSchema.pick([
  'name',
  'phone',
  'address',
  'date_of_birth',
  'avatar'
])

export default function Profile() {
  const { setUser } = useContext(AppContext)
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue(
        'date_of_birth',
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1910, 0, 1)
      )
      setValue('avatar', profile.avatar)
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const res = await updateProfileMutation.mutateAsync(
      {
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        avatar: data.avatar || '',
        date_of_birth: data.date_of_birth
          ? data.date_of_birth.toISOString()
          : new Date(1990, 0, 1).toISOString()
      },
      {
        onSuccess: (data) => {
          setIsUpdateSuccess(true)
          setTimeout(() => {
            setUser(data.data.data)
            setUserToLocalStorage(data.data.data)
            refetch()
            setIsUpdateSuccess(false)
          }, 2000)
        }
      }
    )
    console.log('res', res)
  })

  return (
    <>
      <div className='border-b border-gray-200 pb-4 mb-5'>
        <h1 className='text-xl font-medium mb-2'>Hồ Sơ Của Tôi</h1>
        <div className='text-sm text-gray-500'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form className='text-sm flex' onSubmit={onSubmit}>
        <div className='space-y-8 flex-1 w-[602px]'>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Email</div>
            <div className='w-full truncate'>{profile?.email}</div>
          </div>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Tên</div>
            <Input
              name='name'
              type='text'
              className='w-full'
              register={register}
              placeholder='Nhập tên của bạn'
              errors={errors.name?.message}
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
            />
          </div>

          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>
              Số điện thoại
            </div>
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='w-full'
                  placeholder='Số điện thoại'
                  classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                  errors={errors.phone?.message}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Địa chỉ</div>
            <Input
              name='address'
              type='text'
              className='w-full'
              register={register}
              placeholder='Nhập địa chỉ của bạn'
              errors={errors.address?.message}
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
            />
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                value={field.value}
                onChange={field.onChange}
                errors={errors.date_of_birth?.message}
              />
            )}
          />

          {/* Nút Lưu */}
          <div className='flex items-center'>
            <label
              htmlFor='birthdate'
              className='opacity-0 text-right mr-5 w-1/4 text-gray-600'
            >
              Lưu
            </label>

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
        {/* Avatar (tuỳ chỉnh theo ý muốn) */}
        <div className='w-[280px] flex justify-center border-l border-gray-200 ml-[50px]'>
          <div className='mx-auto'>
            <div className='my-5'>
              <label htmlFor='avatarUpload' className='sr-only'>
                Ảnh đại diện
              </label>
              <img
                src='https://down-vn.img.susercontent.com/file/vn-11134226-7ra0g-m7m83ajnwame54_tn'
                alt='avatar'
                className='w-[100px] h-[100px] rounded-full object-cover mx-auto'
              />
            </div>
            <input className='hidden' type='file' accept='.jpg, .jpeg, .png' />
            <button
              id='avatarUpload'
              type='button'
              className='flex justify-center mx-auto px-3 py-2 border border-gray-300 bg-black bg-opacity-[0.02] text-gray-700'
            >
              Chọn Ảnh
            </button>

            <div>
              <div className=' text-gray-500 mt-4'>
                Dụng lượng file tối đa 1 MB
              </div>
              <div className=' text-gray-500'>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>

      {isUpdateSuccess && <CustomToast message='Cập nhật thành công' />}
    </>
  )
}
