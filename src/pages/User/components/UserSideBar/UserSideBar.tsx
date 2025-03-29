import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import path from 'src/constant/path'
import { AppContext } from 'src/Contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideBar() {
  const { t } = useTranslation('user')
  const { user } = useContext(AppContext)
  return (
    <aside className='w-[180px] py-4'>
      <div className='flex mb-6 pb-5 border-b border-gray-200'>
        <NavLink
          className='flex-shrink-0 w-[50px] h-[50px] rounded-full'
          to={path.profile}
        >
          <div className='shopee-avatar'>
            {user?.avatar ? (
              <img
                src={getAvatarUrl(user?.avatar)}
                alt={user?.name}
                className='w-[50px] h-[50px] rounded-full object-cover'
              />
            ) : (
              <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center mr-2'>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='stroke-[#c6c6c6] w-12 h-12 rounded-full'
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
        </NavLink>
        <div className='pl-4'>
          <div className='text-sm font-medium mb-[5px] truncate max-w-[120px]'>
            {user?.name ? user.name : user?.email}
          </div>
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
              <span>{t('sidebar.editProfile')}</span>
            </NavLink>
          </div>
        </div>
      </div>

      <nav>
        <ul className='space-y-4 text-sm'>
          {/* <li>
            <NavLink to={'#'} className='flex'>
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
          </li> */}
          <li>
            <NavLink to={'#'} className='flex'>
              <div className='flex items-center mr-2'>
                <img
                  className='w-5 h-5'
                  alt='123'
                  src='https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c'
                />
              </div>
              <div className='flex-shrink-0 flex-1'>
                <span className='font-medium'>{t('sidebar.notification')}</span>
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
              <span className='font-medium'>{t('sidebar.my profile')}</span>
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
                  {t('sidebar.change password')}
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
                <span className='font-medium'>{t('sidebar.order')}</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
