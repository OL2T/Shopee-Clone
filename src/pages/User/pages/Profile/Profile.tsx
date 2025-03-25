import Input from 'src/components/Input'

export default function Profile() {
  return (
    <>
      <div className='border-b border-gray-200 pb-4 mb-5'>
        <h1 className='text-xl font-medium mb-2'>Hồ Sơ Của Tôi</h1>
        <div className='text-sm text-gray-500'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form className=' text-sm flex'>
        <div className='space-y-4 flex-1 w-[602px]'>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Email</div>
            <div className='w-full truncate'>a******@gmail.com</div>
          </div>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Tên</div>
            <Input
              name='name'
              type='text'
              className='w-full'
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              value=''
              readOnly
            />
          </div>

          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>
              Số điện thoại
            </div>
            <Input
              name='phone'
              type='text'
              className='w-full'
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              value=''
              readOnly
            />
          </div>
          <div className='flex items-center'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Địa chỉ</div>
            <Input
              name='address'
              type='text'
              className='w-full'
              classNameInput='bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 w-full focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              value=''
              readOnly
            />
          </div>
          <div className='flex items-center pb-4'>
            <div className='text-right mr-5 w-1/4 text-gray-600'>Ngày sinh</div>
            <div className='w-full flex justify-between gap-x-4'>
              <select
                name=''
                id=''
                className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              >
                <option value=''>Ngày</option>
              </select>
              <select
                name=''
                id=''
                className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              >
                <option value=''>Tháng</option>
              </select>
              <select
                name=''
                id=''
                className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm'
              >
                <option value=''>Năm</option>
              </select>
            </div>
          </div>

          {/* Nút Lưu */}
          <div className='flex items-center'>
            <label
              htmlFor='birthdate'
              className='opacity-0 text-right mr-5 w-1/4 text-gray-600'
            >
              Lưu
            </label>

            <div className='w-full'>
              <button type='button' className='px-6 py-2 bg-orange text-white'>
                Lưu
              </button>
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
    </>
  )
}
