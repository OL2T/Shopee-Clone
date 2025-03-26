import { Outlet } from 'react-router-dom'
import UserSideBar from '../../components/UserSideBar/UserSideBar'

export default function UserLayout() {
  return (
    <div className='pb-7'>
      <div className='flex gap-x-[27px]'>
        <UserSideBar />
        <Outlet />
      </div>
    </div>
  )
}
