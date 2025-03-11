import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import path from 'src/constant/path'
import { AppContext } from 'src/Contexts/app.context'
import { ErrorResponseAPI } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isUnprocessableEntityError } from 'src/utils/utils'

type FormData = Schema

export default function Register() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        navigate(path.login)
      },
      onError: (error) => {
        if (
          isUnprocessableEntityError<
            ErrorResponseAPI<Omit<FormData, 'confirm_password'>>
          >(error)
        ) {
          const formErrors = error.response?.data.data
          // Way 2
          if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message:
                  formErrors[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // Way 1
          // if (formErrors?.email) {
          //   setError('email', {
          //     message: formErrors.email,
          //     type: 'Server'
          //   })
          // }
          // if (formErrors?.password) {
          //   setError('password', {
          //     message: formErrors.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-redRegister'>
      <div className='w-full max-w-[1024px] bg-register-hero-pattern bg-no-repeat h-600 mx-auto relative'>
        <div className='absolute -translate-y-[50%] top-[50%] w-full right-0'>
          {/* <Helmet>
          <title>Đăng nhập | Shopee Clone</title>
          <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
        </Helmet> */}
          <div className='container'>
            <div className='grid grid-cols-1 py-12 xl:px-0 lg:grid-cols-5'>
              <div className='lg:col-span-2 lg:col-start-4'>
                <form
                  className='rounded bg-white p-10 shadow-sm'
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className='text-2xl'>Đăng ký</div>
                  <Input
                    name='email'
                    register={register}
                    type='email'
                    className='mt-8'
                    errors={errors.email?.message}
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                  />
                  <Input
                    name='password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errors={errors.password?.message}
                    placeholder='Password'
                    autoComplete='on'
                  />
                  <Input
                    name='confirm_password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errors={errors.confirm_password?.message}
                    placeholder='Confirm Password'
                    autoComplete='on'
                  />

                  <div className='mt-3'>
                    <Button
                      type='submit'
                      className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                      isLoading={registerAccountMutation.isPending}
                      disabled={registerAccountMutation.isPending}
                    >
                      Đăng ký
                    </Button>
                  </div>
                  <div className='text-[12px] mt-8 text-center px-[25px]'>
                    Bằng việc đăng kí, bạn đã đồng ý với Shopee về
                    <a
                      href='https://help.shopee.vn/portal/article/77243'
                      className='text-orange ml-1'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Điều khoản dịch vụ
                    </a>
                    <i className='mx-1 not-italic'>&</i>
                    <a
                      href='https://help.shopee.vn/portal/article/77244'
                      className='text-orange'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Chính sách bảo mật
                    </a>
                  </div>

                  <div className='mt-8 flex items-center justify-center'>
                    <span className='text-gray-400 text-sm'>
                      Bạn đã có tài khoản?
                    </span>
                    <Link className='text-sm ml-1 text-red-400' to={path.login}>
                      Đăng nhập
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
