import { Outlet } from 'react-router-dom'
import UserSideBar from '../../components/UserSideBar/UserSideBar'

export default function UserLayout() {
  return (
    <div className='pb-7'>
      <div className='flex gap-4'>
        {/* Sidebar */}
        <UserSideBar />

        {/* Nội dung chính */}
        <div className='flex-1 bg-white rounded shadow p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
