import { lazy } from "react";
const Login = lazy(() => import('@/Pages/Login'))
const LayoutPage = lazy(() => import('@/Pages/Layout'))
const RouteList = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <LayoutPage />,
    children: []
  }
]
export default RouteList