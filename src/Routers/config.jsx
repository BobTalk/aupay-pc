import Login from "@/Pages/Login";
import LayoutPage from "@/Pages/Layout";
import Denied from "@/Pages/Denied";
import AssetsCount from "@/Pages/Assets";
import DataCount from "@/Pages/data";
import UserManage from "@/Pages/User";
import UserDetail from "@/Pages/User/detail";
import UserDetailInfo from "@/Pages/User/detail/user";
import TradeDetailInfo from "@/Pages/User/detail/trade";
import DrawDetailInfo from "@/Pages/User/detail/draw";
import AssetsChangesDetailInfo from "@/Pages/User/detail/assetsChanges";
import RechargeDetailInfo from "@/Pages/User/detail/recharge";
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
