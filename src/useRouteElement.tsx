import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { AppContext } from './Contexts/app.context'
import { useContext } from 'react'
import path from './constant/path'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'

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
          path: path.profile,
          element: (
            <Home>
              <Profile />
            </Home>
          )
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
