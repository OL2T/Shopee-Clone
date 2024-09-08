import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
// import * as yup from 'yup'

type FormData = Schema

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  console.log(watch())

  return (
    <div className='bg-redRegister'>
      <div className='w-1024 bg-register-hero-pattern h-600 mx-auto relative'>
        <div className='absolute -translate-y-[50%] top-[50%] w-full right-0'>
          {/* <Helmet>
          <title>Đăng nhập | Shopee Clone</title>
          <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
        </Helmet> */}
          <div className='container px-4'>
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
                  <Input
                    name='confirm_password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errors={errors.confirm_password?.message}
                    placeholder='Confirm Password'
                    // rules={rules.confirm_password}
                    autoComplete='on'
                  />

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
