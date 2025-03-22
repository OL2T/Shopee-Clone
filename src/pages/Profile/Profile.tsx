export default function Profile() {
  return (
    <div className=' bg-gray-100'>
      {/* Container tổng */}
      <div className='flex gap-4'>
        {/* Sidebar */}
        <aside className='w-64 bg-white rounded shadow p-4'>
          <nav>
            <ul className='space-y-4'>
              <li>
                <button
                  type='button'
                  className='block text-gray-700 hover:text-blue-500 transition text-left w-full cursor-pointer'
                >
                  Thông Báo
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className='block text-gray-700 hover:text-blue-500 transition text-left w-full cursor-pointer'
                >
                  Hồ Sơ
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className='block text-gray-700 hover:text-blue-500 transition text-left w-full cursor-pointer'
                >
                  Ngân Hàng
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className='block text-gray-700 hover:text-blue-500 transition text-left w-full cursor-pointer'
                >
                  Mật Khẩu
                </button>
              </li>
              {/* Thêm các mục khác nếu cần */}
            </ul>
          </nav>
        </aside>

        {/* Nội dung chính */}
        <div className='flex-1 bg-white rounded shadow p-6'>
          <h1 className='text-xl font-semibold mb-6'>Hồ Sơ Của Tôi</h1>
          <div className='text-sm text-gray-500 mb-4'>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </div>

          <form className='space-y-4'>
            {/* Tên đăng nhập (chỉ đọc) */}
            <div className='flex items-center'>
              <label htmlFor='username' className='w-1/4 text-gray-600'>
                Tên đăng nhập
              </label>
              <input
                id='username'
                type='text'
                className='border rounded p-2 w-1/2 bg-gray-50 cursor-not-allowed'
                value='lamtai123456'
                readOnly
              />
            </div>

            {/* Tên */}
            <div className='flex items-center'>
              <label htmlFor='name' className='w-1/4 text-gray-600'>
                Tên
              </label>
              <input
                id='name'
                type='text'
                className='border rounded p-2 w-1/2'
                placeholder='Lâm Tài'
              />
            </div>
            {/* Email */}
            <div className='flex items-center'>
              <label htmlFor='email' className='w-1/4 text-gray-600'>
                Email
              </label>
              <input
                id='email'
                type='email'
                className='border rounded p-2 w-1/2'
                placeholder='example@gmail.com'
              />
            </div>
            {/* Số điện thoại */}
            <div className='flex items-center'>
              <label htmlFor='phone' className='w-1/4 text-gray-600'>
                Số điện thoại
              </label>
              <input
                id='phone'
                type='text'
                className='border rounded p-2 w-1/2'
                placeholder='09*******'
              />
            </div>
            {/* Giới tính */}
            <div className='flex items-center'>
              <label htmlFor='gender' className='w-1/4 text-gray-600'>
                Giới tính
              </label>
              <select id='gender' className='border rounded p-2 w-1/2'>
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
              </select>
            </div>
            <option value='female'>Nữ</option>
            {/* Ngày sinh */}
            <div className='flex items-center'>
              <label htmlFor='birthdate' className='w-1/4 text-gray-600'>
                Ngày sinh
              </label>
              <input
                id='birthdate'
                type='date'
                className='border rounded p-2 w-1/2'
              />
            </div>
            {/* Avatar (tuỳ chỉnh theo ý muốn) */}
            <div className='flex items-center'>
              <label htmlFor='avatar' className='w-1/4 text-gray-600'>
                Ảnh đại diện
              </label>
              <div className='flex items-center w-1/2'>
                <div className='flex items-center'>
                  <label htmlFor='avatarUpload' className='w-1/4 text-gray-600'>
                    Ảnh đại diện
                  </label>
                  <div className='flex items-center w-1/2'>
                    <img
                      src='https://via.placeholder.com/50'
                      alt='avatar'
                      className='w-12 h-12 rounded-full object-cover mr-4'
                    />
                    <button
                      id='avatarUpload'
                      type='button'
                      className='px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
                    >
                      Chọn Ảnh
                    </button>
                  </div>
                </div>
              </div>
              {/* Nút Lưu */}
              <button
                type='button'
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
