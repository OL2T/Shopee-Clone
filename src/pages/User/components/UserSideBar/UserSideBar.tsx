import { Link } from 'react-router-dom'
import path from 'src/constant/path'

export default function UserSideBar() {
  return (
    <aside className='w-64 bg-white rounded shadow p-4'>
      <nav>
        <ul className='space-y-4'>
          <li>
            <Link to={path.profile}>Profile</Link>
          </li>
          <li>
            <Link to={path.changePassword}>ChangePas</Link>
          </li>
          <li>
            <Link to={path.purchase}>Purchase</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
