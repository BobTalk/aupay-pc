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
import StaffDetail from "@/Pages/System/staffManage/detail";
import NoticeList from "@/Pages/Notice";
import NoticeEditor from "@/Pages/Notice/editor";
import PersonalInfo from "@/Pages/Personal";
const RouteList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/denied",
    element: <Denied />,
  },
  {
    path: "/aupay",
    title:"权限中心",
    element: <LayoutPage />,
    isAuth: true,
    children: [
      {
        path: "assets",
        title:"资产统计",
        element: <AssetsCount />,
        isAuth: true,
      },
      {
        path: "data",
        title:"数据统计",
        element: <DataCount />,
        isAuth: true,
      },
      {
        path: "user",
        title:"用户管理",
        element: <UserManage />,
        isAuth: true,
        children: [
          {
            path: 'detail',
            element: <UserDetail />,
            isAuth: true,
            title:"详情",
            children: [
              {
                path: 'user',
                element: <UserDetailInfo />,
                isAuth: true,
                title:"用户详情",
              },
              {
                path: 'recharge',
                element: <RechargeDetailInfo />,
                isAuth: true,
                title:"充币记录",
              },
              {
                path: 'draw',
                element: <DrawDetailInfo />,
                isAuth: true,
                title:"提币记录",
              },
              {
                path: 'trade',
                element: <TradeDetailInfo />,
                isAuth: true,
                title:"交易记录",
              },
              {
                path: 'assetsChanges',
                element: <AssetsChangesDetailInfo />,
                isAuth: true,
                title:"资产变动记录",
              }
            ]
          }
        ]
      },
      {
        path: 'address',
        title: "地址管理",
        element: <AddressManage />,
        isAuth: true,
        children: [
          {
            path: 'user',
            title: "用户地址",
            element: <UserAddress />,
            isAuth: true,
          },
          {
            path: 'transfer',
            title:"中转地址",
            element: <TransferAddress />,
            isAuth: true,
          },
          {
            path: 'reserve',
            title:"储备资产",
            element: <ReserveAddress />,
            isAuth: true,
          },
          {
            path: 'draw',
            title:"提币地址",
            element: <DrawAddress />,
            isAuth: true,
          },
          {
            path: 'minerFees',
            title:"矿工费地址",
            element: <MinerFeesAddress />,
            isAuth: true,
          },
        ]
      },
      {
        path: 'ozbet',
        title:"ozbet",
        element: <Ozbet />,
        isAuth: true,
        children: [
          {
            path: 'assets',
            title:"Ozbet资产地址",
            element: <AssetsAddr />,
            isAuth: true,
            children: [
              {
                path: 'transfer-records',
                element: <OzbetTransferRecords />,
                isAuth: true,
              }
            ]
          },
          {
            path: 'draw',
            title:"Ozbet提款地址",
            element: <DrawAddr />,
            isAuth: true,
            children: [
              {
                path: 'transfer-records',
                element: <OzbetTransferRecords />,
                isAuth: true,
              }
            ]
          },

        ]
      },
      {
        path: 'system',
        title:"系统管理",
        element: <System />,
        isAuth: true,
        children: [
          {
            path: 'ip-manage',
            title: "IP管理",
            element: <IPManage />,
            isAuth: true,
          },
          {
            path: 'ip-record',
            title: "IP记录",
            element: <IPRecord />,
            isAuth: true,
          },
          {
            path: 'automated',
            title: "自动化配置",
            element: <AutomatedConfig />,
            isAuth: true,
          },
          {
            path: 'draw',
            title: "提币设置",
            element: <DrawConfig />,
            isAuth: true,
          },
          {
            path: 'rate-manage',
            title: "汇率管理",
            element: <RateManage />,
            isAuth: true,
          },
          {
            path: 'logs-manage',
            title: "日志记录",
            element: <LogsManage />,
            isAuth: true,
          },
          {
            path: 'staff-manage',
            title: "员工管理",
            element: <StaffManage />,
            isAuth: true,
            children: [
              {
                path: 'detail',
                element: <StaffDetail />,
                isAuth: true,
              }
            ]
          },
        ]
      },
      {
        path: 'notice',
        element: <NoticeList />,
        title: "公告列表",
        isAuth: true,
        children: [
          {
            path: 'add',
            element: <NoticeEditor />,
            isAuth: true,
          },
          {
            path: 'editor',
            element: <NoticeEditor />,
            isAuth: true,
          }
        ]
      },
      {
        path: 'personal',
        title: "个人资料",
        element: <PersonalInfo />,
        isAuth: true,
      },

    ],
  },
];
export default RouteList;
