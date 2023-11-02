import { Menu } from "antd";
import styleScope from "./menu.module.less";
import { mergeClassName } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import urlMap from "./urlMapTitle";
const LayoutMenu = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let { pathname } = useLocation();
  console.log("pathname: ", pathname);
  function menuSelectCb({ key, domEvent }) {
    stop(domEvent, () => {
      navigate(key, { state: { _title: urlMap[key] } });
    });
  }
  const activePath = {
    "/aupay/data": ["/aupay/data"],
    "/aupay/assets": ["/aupay/assets"],
    "/aupay/user/detail/user": ["/aupay/user"],
    "/aupay/user/detail/assetsChanges": ["/aupay/user"],
    "/aupay/user/detail/trade": ["/aupay/user"],
    "/aupay/user/detail/draw": ["/aupay/user"],
    "/aupay/user/detail/recharge": ["/aupay/user"],
    "/aupay/address/user": ["/aupay/address", "/aupay/address/user"],
    "/aupay/address/transfer": ["/aupay/address", "/aupay/address/transfer"],
    "/aupay/address/reserve": ["/aupay/address", "/aupay/address/reserve"],
    "/aupay/address/draw": ["/aupay/address", "/aupay/address/draw"],
    "/aupay/address/minerFees": ["/aupay/address", "/aupay/address/minerFees"],
    "/aupay/ozbet": ["/aupay/ozbet"],
    "/aupay/ozbet/assets": ["/aupay/ozbet", "/aupay/ozbet/assets"],
    "/aupay/ozbet/draw": ["/aupay/ozbet", "/aupay/ozbet/draw"],
    "/aupay/ozbet/assets/transfer-records": [
      "/aupay/ozbet",
      "/aupay/ozbet/assets",
    ],
    "/aupay/personal": ["/aupay/personal"],
    "/aupay/system/staff-manage": [
      "/aupay/system",
      "/aupay/system/staff-manage",
    ],
    "/aupay/system/logs-manage": ["/aupay/system", "/aupay/system/logs-manage"],
    "/aupay/system/rate-manage": ["/aupay/system", "/aupay/system/rate-manage"],
    "/aupay/system/draw": ["/aupay/system", "/aupay/system/draw"],
    "/aupay/system/automated": ["/aupay/system", "/aupay/system/automated"],
    "/aupay/system/ip-record": ["/aupay/system", "/aupay/system/ip-record"],
    "/aupay/system/ip-manage": ["/aupay/system", "/aupay/system/ip-manage"],
    "/aupay/notice": ["/aupay/notice"],
    "/aupay/notice/add": ["/aupay/notice"],
    "/aupay/system/staff-manage/detail": ["/aupay/system/staff-manage"],
  };
  return (
    <Menu
      theme="light"
      onSelect={menuSelectCb}
      mode="inline"
      className={mergeClassName(
        styleScope["menu-box"],
        "pt-[.1rem] px-[.1rem]"
      )}
      defaultSelectedKeys={activePath[pathname]}
      items={[
        {
          key: "/aupay/assets",
          icon: (
            <Icon name="h-icon-zichantongji" className={styleScope["icon"]} />
          ),
          label: "资产统计",
        },
        {
          key: "/aupay/data",
          icon: (
            <Icon name="h-icon-shujutongji" className={styleScope["icon"]} />
          ),
          label: "数据统计",
        },
        {
          key: "/aupay/user",
          icon: (
            <Icon name="h-icon-yonghuguanli" className={styleScope["icon"]} />
          ),
          label: "用户管理",
        },
        {
          key: "/aupay/address",
          icon: (
            <Icon name="h-icon-dizhiguanli" className={styleScope["icon"]} />
          ),
          label: "地址管理",
          children: [
            {
              key: "/aupay/address/user",
              icon: <></>,
              label: "用户地址",
            },
            {
              key: "/aupay/address/transfer",
              icon: <></>,
              label: "中转地址",
            },
            {
              key: "/aupay/address/reserve",
              icon: <></>,
              label: "储备资产",
            },
            {
              key: "/aupay/address/draw",
              icon: <></>,
              label: "提币地址",
            },
            {
              key: "/aupay/address/minerFees",
              icon: <></>,
              label: "矿工费地址",
            },
          ],
        },
        {
          key: "/aupay/ozbet",
          icon: <Icon name="h-icon-Ozbet" className={styleScope["icon"]} />,
          label: "Ozbet",
          children: [
            {
              key: "/aupay/ozbet/assets",
              icon: <></>,
              label: "Ozbet资产地址",
            },
            {
              key: "/aupay/ozbet/draw",
              icon: <></>,
              label: "Ozbet提款地址",
            },
          ],
        },
        {
          key: "/aupay/notice",
          icon: (
            <Icon name="h-icon-gonggaoliebiao" className={styleScope["icon"]} />
          ),
          label: "公告列表",
        },
        {
          key: "/aupay/system",
          icon: (
            <Icon name="h-icon-xitongguanli" className={styleScope["icon"]} />
          ),
          label: "系统管理",
          children: [
            {
              key: "/aupay/system/ip-manage",
              label: "IP管理",
            },
            {
              key: "/aupay/system/ip-record",
              label: "IP记录",
            },
            {
              key: "/aupay/system/automated",
              label: "自动化配置",
            },
            {
              key: "/aupay/system/draw",
              label: "提币设置",
            },
            {
              key: "/aupay/system/rate-manage",
              label: "汇率管理",
            },
            {
              key: "/aupay/system/logs-manage",
              label: "日志记录",
            },
            {
              key: "/aupay/system/staff-manage",
              label: "员工管理",
            },
          ],
        },
        {
          key: "/aupay/personal",
          icon: (
            <Icon name="h-icon-gerenziliao" className={styleScope["icon"]} />
          ),
          label: "个人资料",
        },
      ]}
    />
  );
};
export default LayoutMenu;
