import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Home from './pages/Home'
import { lazy, Suspense } from 'react'
import path from './constant/path'
import UserLayout from './pages/User/layouts/UserLayout/UserLayout'
import Loading from './components/Loading/Loading'
import { useIsAuthenticated } from './stores'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Page404 = lazy(() => import('./pages/Page404/Page404'))
const ChangePassword = lazy(
  () => import('./pages/User/pages/ChangePassword/ChangePassword')
)
const Purchase = lazy(() => import('./pages/User/pages/Purchase/Purchase'))
const Profile = lazy(() => import('./pages/User/pages/Profile/Profile'))

function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const isAuthenticated = useIsAuthenticated()
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
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
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
              element: (
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense fallback={<Loading />}>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.purchase,
              element: (
                <Suspense fallback={<Loading />}>
                  <Purchase />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <Home>
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
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
          <Suspense fallback={<Loading />}>
            <ProductList />
          </Suspense>
        </Home>
      )
    },
    {
      path: path.productPk,
      element: (
        <Home>
          <Suspense fallback={<Loading />}>
            <ProductDetail />
          </Suspense>
        </Home>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <Page404 />
        </Suspense>
      )
    }
  ])
  return routeElements
}
