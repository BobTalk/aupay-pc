import { lazy } from "react";
const Login = lazy(() => import('@/Pages/Login'))
const LayoutPage = lazy(() => import('@/Pages/Layout'))
const Denied = lazy(() => import('@/Pages/Denied'))
const RouteList = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/denied',
    element: <Denied />
  },
  {
    path: '/home',
    element: <LayoutPage />,
    children: []
  }
]
export default RouteList