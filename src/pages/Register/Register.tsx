import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { rules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  console.log(errors)
  return (
    <div className='bg-redRegister'>
      <div className='w-1024 bg-register-hero-pattern h-600 mx-auto relative'>
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
                  <div className='text-2xl'>Đăng ký</div>
                  <div className='mt-8'>
                    <input
                      // name='email'
                      {...register('email', rules.email)}
                      type='email'
                      className='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                      placeholder='Email/Số điện thoại/Tên đăng nhập'
                    />
                    <div className='mt-1 text-sm min-h-[1.25rem] text-red-600'>
                      {errors.email?.message}
                    </div>
                  </div>
                  <div className='mt-2'>
                    <input
                      // name='password'
                      {...register('password', rules.password)}
                      type='password'
                      className=' bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                      // classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                      // errorMessage={errors.password?.message}
                      placeholder='Password'
                      autoComplete='on'
                    />
                    <div className='mt-1 text-sm min-h-[1.25rem] text-red-600'>
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className='mt-2'>
                    <input
                      // name='confirm-password'
                      // register={register}
                      {...register('confirm_password', rules.confirm_password)}
                      type='password'
                      className=' bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                      // classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                      // errorMessage={errors.password?.message}
                      placeholder='Confirm Password'
                      autoComplete='on'
                    />
                    <div className='mt-1 text-sm min-h-[1.25rem] text-red-600'>
                      {errors.confirm_password?.message}
                    </div>
                  </div>

                  <div className='mt-3'>
                    <button
                      type='submit'
                      className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                      // isLoading={loginMutation.isLoading}
                      // disabled={loginMutation.isLoading}
                    >
                      Đăng ký
                    </button>
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
                    <Link className='text-sm ml-1 text-red-400' to='/login'>
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
