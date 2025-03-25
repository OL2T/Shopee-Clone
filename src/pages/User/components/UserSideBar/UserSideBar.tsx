import { NavLink } from 'react-router-dom'
import path from 'src/constant/path'

export default function UserSideBar() {
  return (
    <aside className='w-[180px] py-4'>
      <div className='flex mb-6 pb-5 border-b border-gray-200'>
        <NavLink
          className='flex-shrink-0 w-[50px] h-[50px] rounded-full'
          to={path.profile}
        >
          <div className='shopee-avatar'>
            <img
              className='w-[50px] h-[50px] rounded-full'
              alt='tntilm880'
              src='https://down-vn.img.susercontent.com/file/vn-11134226-7ra0g-m7m83ajnwame54_tn'
            />
          </div>
        </NavLink>
        <div className='w-full pl-4'>
          <div className='text-sm font-medium mb-[5px]'>tntilm880</div>
          <div className='text-sm text-[#888]'>
            <NavLink className='flex w-full items-center' to={path.profile}>
              <svg
                width={12}
                height={12}
                viewBox='0 0 12 12'
                xmlns='http://www.w3.org/2000/svg'
                style={{ marginRight: 4 }}
              >
                <path
                  d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                  fill='#9B9B9B'
                  fillRule='evenodd'
                />
              </svg>
              <span>Sửa hồ sơ</span>
            </NavLink>
          </div>
        </div>
      </div>

      <nav>
        <ul className='space-y-4 text-sm'>
          <li>
            <NavLink to={''} className='flex'>
              <div className='flex items-start mr-2'>
                <img
                  className='w-5 h-5'
                  alt='123'
                  src='https://down-vn.img.susercontent.com/file/sg-11134004-7rffa-m4fyst69au5789'
                />
              </div>
              <div className='flex-shrink-0 flex-1'>
                <span className='font-medium'>Ưu đãi dành riêng cho bạn</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={''} className='flex'>
              <div className='flex items-center mr-2'>
                <img
                  className='w-5 h-5'
                  alt='123'
                  src='https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c'
                />
              </div>
              <div className='flex-shrink-0 flex-1'>
                <span className='font-medium'>Thông báo</span>
              </div>
            </NavLink>
          </li>
          <li>
            <div className='flex items-center mb-[15px]'>
              <div className='flex items-center mr-2'>
                <img
                  className='w-5 h-5'
                  alt='123'
                  src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
                />
              </div>
              <span className='font-medium'>Tài khoản của tôi</span>
            </div>
            <div className='pl-[34px]'>
              <div className='space-y-3'>
                <NavLink
                  to={path.profile}
                  className={({ isActive }) =>
                    `flex items-center w-full ${isActive ? 'text-orange' : ''}`
                  }
                >
                  Hồ sơ
                </NavLink>
                <NavLink
                  to={path.changePassword}
                  className={({ isActive }) =>
                    `flex items-center w-full ${isActive ? 'text-orange' : ''}`
                  }
                >
                  Đổi mật khẩu
                </NavLink>
              </div>
            </div>
          </li>
          <li>
            <NavLink
              to={path.purchase}
              className={({ isActive }) =>
                `flex items-center ${isActive ? 'text-orange' : ''}`
              }
            >
              <div className='flex items-center mr-2'>
                <img
                  className='w-5 h-5'
                  alt='123'
                  src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
                />
              </div>
              <div className='mY8KSl'>
                <span className='font-medium'>Đơn mua</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
