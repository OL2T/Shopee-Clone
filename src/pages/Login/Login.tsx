import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/Contexts/app.context'
import { ErrorResponseAPI } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isUnprocessableEntityError } from 'src/utils/utils'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isUnprocessableEntityError<ErrorResponseAPI<FormData>>(error)) {
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
            <div className='grid grid-cols-1 py-12 lg:grid-cols-5'>
              <div className='lg:col-span-2 lg:col-start-4'>
                <form
                  className='rounded bg-white p-10 shadow-sm'
                  onSubmit={onSubmit}
                  noValidate
                >
                  <div className='text-2xl'>Đăng Nhập</div>
                  <Input
                    name='email'
                    register={register}
                    type='email'
                    className='mt-8'
                    errors={errors.email?.message}
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                    // rules={rules.email}
                  />
                  <Input
                    name='password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errors={errors.password?.message}
                    placeholder='Password'
                    // rules={rules.password}
                    autoComplete='on'
                  />
                  <div className='mt-3'>
                    <Button
                      type='submit'
                      className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                      isLoading={loginAccountMutation.isPending}
                      disabled={loginAccountMutation.isPending}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                  <div className='mt-8 flex items-center justify-center'>
                    <span className='text-gray-400 text-sm'>
                      Bạn mới biết đến Shopee?
                    </span>
                    <Link className='text-sm ml-1 text-red-400' to='/register'>
                      Đăng ký
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
