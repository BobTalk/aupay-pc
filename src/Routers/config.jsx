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
import AddressManage from "@/Pages/Address";
import UserAddress from "@/Pages/Address/user";
import MinerFeesAddress from "@/Pages/Address/minerFees";
import DrawAddress from "@/Pages/Address/draw";
import ReserveAddress from "@/Pages/Address/reserve";
import TransferAddress from "@/Pages/Address/transfer";
import Ozbet from "@/Pages/Ozbet";
import AssetsAddr from "@/Pages/Ozbet/assetsAddress";
import DrawAddr from "@/Pages/Ozbet/drawAddress";
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
      {
        path: 'address',
        element: <AddressManage />,
        children: [
          {
            path: 'user',
            element: <UserAddress />
          },
          {
            path: 'transfer',
            element: <TransferAddress />
          },
          {
            path: 'reserve',
            element: <ReserveAddress />
          },
          {
            path: 'draw',
            element: <DrawAddress />
          },
          {
            path: 'minerFees',
            element: <MinerFeesAddress />
          },
        ]
      },
      {
        path: 'ozbet',
        element: <Ozbet />,
        children: [
          {
            path: 'assets',
            element: <AssetsAddr />
          },
          {
            path: 'draw',
            element: <DrawAddr />
          }
        ]
      }
    ],
  },
];
export default RouteList;
