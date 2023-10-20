import { lazy } from "react";
const Login = lazy(() => import("@/Pages/Login"));
const LayoutPage = lazy(() => import("@/Pages/Layout"));
const Denied = lazy(() => import("@/Pages/Denied"));
const AssetsCount = lazy(() => import("@/Pages/Assets"));
const DataCount = lazy(() => import("@/Pages/data"));
const UserManage = lazy(() => import("@/Pages/User"));
const UserDetail = lazy(() => import("@/Pages/User/detail"));
const UserDetailInfo = lazy(() => import("@/Pages/User/detail/user"));
const TradeDetailInfo = lazy(() => import("@/Pages/User/detail/trade"));
const DrawDetailInfo = lazy(() => import("@/Pages/User/detail/draw"));
const AssetsChangesDetailInfo = lazy(() => import("@/Pages/User/detail/assetsChanges"));
const RechargeDetailInfo = lazy(() => import("@/Pages/User/detail/recharge"));
const RouteList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/denied",
    element: <Denied />,
  },
  {
    path: "/aupay",
    element: <LayoutPage />,
    children: [
      {
        path: "assets",
        element: <AssetsCount />,
      },
      {
        path: "data",
        element: <DataCount />,
      },
      {
        path: "user",
        element: <UserManage />,
        children: [
          {
            path: 'detail',
            element: <UserDetail />,
            children: [
              {
                path: 'user',
                element: <UserDetailInfo />
              },
              {
                path: 'recharge',
                element: <RechargeDetailInfo />
              },
              {
                path: 'draw',
                element: <DrawDetailInfo />
              },
              {
                path: 'trade',
                element: <TradeDetailInfo />
              },
              {
                path: 'assetsChanges',
                element: <AssetsChangesDetailInfo />
              }
            ]
          }
        ]

      },

    ],
  },
];
export default RouteList;
