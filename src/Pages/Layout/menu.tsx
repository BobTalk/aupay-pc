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
    "/aupay/user": ["/aupay/user"],
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
          key: "5",
          icon: <Icon name="h-icon-Ozbet" className={styleScope["icon"]} />,
          label: "Ozbet",
          children: [],
        },
        {
          key: "6",
          icon: (
            <Icon name="h-icon-gonggaoliebiao" className={styleScope["icon"]} />
          ),
          label: "公告列表",
        },
        {
          key: "7",
          icon: (
            <Icon name="h-icon-xitongguanli" className={styleScope["icon"]} />
          ),
          label: "系统管理",
          children: [],
        },
        {
          key: "8",
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
