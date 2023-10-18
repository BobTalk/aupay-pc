import { lazy } from "react";
const Login = lazy(() => import('@/Pages/Login'))
const LayoutPage = lazy(() => import('@/Pages/Layout'))
const Denied = lazy(() => import('@/Pages/Denied'))
const AssetsCount = lazy(() => import('@/Pages/Assets'))
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
    path: '/aupay',
    element: <LayoutPage />,
    children: [
      {
        path:'assets',
        element: <AssetsCount/>
      }
    ]
  }
]
export default RouteList