import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import userAPI from 'src/apis/user.api'
import Button from 'src/components/Button/Button'
import CustomToast from 'src/components/CustomToast/CustomToast'
import DateSelect from 'src/components/DateSelect/DateSelect'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile/InputFile'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { AppContext } from 'src/Contexts/app.context'
import { setUserToLocalStorage } from 'src/types/auth'
import { ErrorResponseAPI } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { getAvatarUrl, isUnprocessableEntityError } from 'src/utils/utils'

function Info() {
  const { t } = useTranslation('user')
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='flex items-center'>
        <div className='text-right mr-5 w-1/4 text-gray-600'>
          {t('profile.name')}
        </div>
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
          {t('profile.phone')}
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
        <div className='text-right mr-5 w-1/4 text-gray-600'>
          {t('profile.address')}
        </div>
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
    </>
  )
}
type FormData = Pick<
  UserSchema,
  'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'
>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick([
  'name',
  'phone',
  'address',
  'date_of_birth',
  'avatar'
])

export default function Profile() {
  const { t } = useTranslation('user')
  const { setUser, user } = useContext(AppContext)
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
  const [fileLocal, setFileLocal] = useState<File>()

  const previewImage = useMemo(() => {
    return fileLocal ? URL.createObjectURL(fileLocal) : ''
  }, [fileLocal])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userAPI.uploadAvatar
  })

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    watch,
    formState: { errors },
    setValue,
    setError,
    handleSubmit
  } = methods
  const avatar = watch('avatar')

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
    try {
      let avatarRes = avatar
      if (fileLocal) {
        const formData = new FormData()
        formData.append('image', fileLocal)
        await uploadAvatarMutation.mutateAsync(formData, {
          onSuccess: (data) => {
            avatarRes = data.data.data
            setValue('avatar', avatarRes)
          }
        })
      }
      await updateProfileMutation.mutateAsync(
        {
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || '',
          avatar: avatarRes || data.avatar,
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
            }, 1500)
          }
        }
      )
    } catch (error) {
      if (isUnprocessableEntityError<ErrorResponseAPI<FormDataError>>(error)) {
        const formErrors = error.response?.data.data
        if (formErrors) {
          Object.keys(formErrors).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formErrors[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='flex-1 bg-white rounded shadow p-6'>
      <Helmet>
        <title>Hồ sơ của tôi | Shopee Clone</title>
        <meta
          name='description'
          content='Trang hồ sơ của tôi dự án Shopee Clone'
        />
      </Helmet>
      <div className='border-b border-gray-200 pb-4 mb-5'>
        <h1 className='text-xl font-medium mb-2'>{t('profile.my profile')}</h1>
        <div className='text-sm text-gray-500'>
          {t('profile.Manage and protect your account')}
        </div>
      </div>
      <FormProvider {...methods}>
        <form className='text-sm flex' onSubmit={onSubmit}>
          <div className='space-y-7 flex-1 w-[602px]'>
            <div className='flex items-center'>
              <div className='text-right mr-5 w-1/4 text-gray-600'>Email</div>
              <div className='w-full truncate'>{profile?.email}</div>
            </div>

            <Info />

            <div className='flex items-center'>
              <div className='opacity-0 text-right mr-5 w-1/4 text-gray-600'>
                Lưu
              </div>

              <div className='w-full'>
                <Button
                  type='submit'
                  className='px-6 py-2 bg-orange text-white'
                  disabled={updateProfileMutation.isPending}
                  isLoading={updateProfileMutation.isPending}
                >
                  {t('profile.save')}
                </Button>
              </div>
            </div>
          </div>

          <div className='w-[280px] flex justify-center border-l border-gray-200 ml-[50px]'>
            <div className='mx-auto'>
              <div className=' my-5'>
                <label htmlFor='avatarUpload' className='sr-only'>
                  Ảnh đại diện
                </label>
                {avatar || previewImage ? (
                  <img
                    src={previewImage || (avatar && getAvatarUrl(avatar))}
                    alt={user?.name}
                    className={`w-[100px] h-[100px] rounded-full object-cover mx-auto ${errors.avatar?.message ? 'animate-shake border border-red-600' : ''}`}
                  />
                ) : (
                  <div className='w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center mx-auto'>
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='stroke-[#c6c6c6] w-[80px] h-[80px] rounded-full'
                    >
                      <g>
                        <circle
                          cx='7.5'
                          cy='4.5'
                          fill='none'
                          r='3.8'
                          strokeMiterlimit={10}
                        />
                        <path
                          d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                        />
                      </g>
                    </svg>
                  </div>
                )}
              </div>
              <InputFile
                setError={setError}
                onChange={(file) => {
                  setFileLocal(file)
                }}
              />

              <div>
                <div
                  className={`mt-4 ${errors.avatar?.message ? 'text-red-500 animate-shake' : 'text-gray-400'}`}
                >
                  {t('profile.FileSizeMaximum1MB')}
                </div>
                <div className=' text-gray-400'>
                  {t('profile.FileExtension.JPEG,.PNG')}
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      {isUpdateSuccess && (
        <CustomToast message={t('message.updateProfileSuccess')} />
      )}
    </div>
  )
}
