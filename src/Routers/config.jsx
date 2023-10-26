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
import OzbetTransferRecords from "@/Pages/Ozbet/transferRecords";
import System from "@/Pages/System";
import IPManage from "@/Pages/System/IPManage";
import IPRecord from "@/Pages/System/IPRecord";
import AutomatedConfig from "@/Pages/System/automatedConfig";
import DrawConfig from "@/Pages/System/drawConfig";
import RateManage from "@/Pages/System/rateManage";
import LogsManage from "@/Pages/System/logs";
import StaffManage from "@/Pages/System/staffManage";
import NoticeList from "@/Pages/Notice";
import PersonalInfo from "@/Pages/Personal";
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
            element: <AssetsAddr />,
            children: [
              {
                path: 'transfer-records',
                element: <OzbetTransferRecords />
              }
            ]
          },
          {
            path: 'draw',
            element: <DrawAddr />
          },

        ]
      },
      {
        path: 'system',
        element: <System />,
        children: [
          {
            path: 'ip-manage',
            element: <IPManage />
          },
          {
            path: 'ip-record',
            element: <IPRecord />
          },
          {
            path: 'automated',
            element: <AutomatedConfig />
          },
          {
            path: 'draw',
            element: <DrawConfig />
          },
          {
            path: 'rate-manage',
            element: <RateManage />
          },
          {
            path: 'logs-manage',
            element: <LogsManage />
          },
          {
            path: 'staff-manage',
            element: <StaffManage />
          },
        ]
      },
      {
        path: 'notice',
        element: <NoticeList />
      },
      {
        path: 'personal',
        element: <PersonalInfo />
      },

    ],
  },
];
export default RouteList;
