// import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
export default function Login() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm()

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data)
  // })
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
                  // onSubmit={onSubmit}
                  noValidate
                >
                  <div className='text-2xl'>Đăng Nhập</div>

                  <input
                    name='email'
                    // register={register}
                    type='email'
                    className=' mt-8 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                    // errorMessage={errors.email?.message}
                    placeholder='Email/Số điện thoại/Tên đăng nhập'
                  />

                  <input
                    name='password'
                    // register={register}
                    type='password'
                    className='mt-[30px] bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
                    // classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                    // errorMessage={errors.password?.message}
                    placeholder='Password'
                    autoComplete='on'
                  />
                  <div className='mt-8'>
                    <button
                      type='submit'
                      className='flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                      // isLoading={loginMutation.isLoading}
                      // disabled={loginMutation.isLoading}
                    >
                      Đăng nhập
                    </button>
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
