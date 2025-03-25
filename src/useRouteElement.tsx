import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import Home from './pages/Home'
import { AppContext } from './Contexts/app.context'
import { useContext } from 'react'
import path from './constant/path'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import UserLayout from './pages/User/layouts/UserLayout/UserLayout'
import Profile from './pages/User/pages/Profile/Profile'
import ChangePassword from './pages/User/pages/ChangePassword/ChangePassword'
import Purchase from './pages/User/pages/Purchase/Purchase'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <Home>
              <UserLayout />
            </Home>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.purchase,
              element: <Purchase />
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <Home>
              <Cart />
            </Home>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <Home>
          <ProductList />
        </Home>
      )
    },
    {
      path: path.productPk,
      element: (
        <Home>
          <ProductDetail />
        </Home>
      )
    }
  ])
  return routeElements
}
