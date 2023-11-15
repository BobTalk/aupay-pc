import { Menu } from "antd";
import styleScope from "./menu.module.less";
import { getSession, mergeClassName } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import { cloneDeep } from "lodash";
import { activePath, activePathToName } from "./activeRouterConfig";
import { useEffect, useLayoutEffect, useState } from "react";
const LayoutMenu = () => {
  let [stop] = useStopPropagation();
  let navigate = useNavigate();
  let permissionRouter = getSession("activePath");
  let { pathname } = useLocation();
  let [crtPath, setCrtPath] = useState();

  function menuSelectCb({ key, domEvent }) {
    stop(domEvent, () => {
      navigate(key, { state: { _title: activePathToName[key] } });
      breadSite(key);
    });
  }
  function breadSite(key) {
    let activeKey = activePathToName[key];
    let activeP = activePath[key];
    setCrtPath(activeP);
    if (activeKey?.length > 1) {
      let res = activeKey.map((item, idx, arr) => {
        return idx === arr.length - 1 || !idx
          ? { title: item }
          : { title: item, href: activeP[idx] };
      });
      store.dispatch({ type: "ADD_BREADCRUMB", data: res });
    } else {
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: [{ title: activePathToName[key][0] }],
      });
    }
  }
  let [menuList, setMenuList] = useState([
    {
      key: "/aupay/assets",
      icon: <Icon name="h-icon-zichantongji" className={styleScope["icon"]} />,
      label: "资产统计",
    },
    {
      key: "/aupay/data",
      icon: <Icon name="h-icon-shujutongji" className={styleScope["icon"]} />,
      label: "数据统计",
    },
    {
      key: "/aupay/user",
      icon: <Icon name="h-icon-yonghuguanli" className={styleScope["icon"]} />,
      label: "用户管理",
    },
    {
      key: "/aupay/address",
      icon: <Icon name="h-icon-dizhiguanli" className={styleScope["icon"]} />,
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
      label: "公告列表",
      icon: (
        <Icon name="h-icon-gonggaoliebiao" className={styleScope["icon"]} />
      ),
    },
    {
      key: "/aupay/system",
      icon: <Icon name="h-icon-xitongguanli" className={styleScope["icon"]} />,
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
      icon: <Icon name="h-icon-gerenziliao" className={styleScope["icon"]} />,
      label: "个人资料",
    },
  ]);
  function filterRouter(menuInfo = []) {
    menuInfo = cloneDeep(menuInfo);
    let filterRes = menuInfo.filter((item) =>
      permissionRouter.includes(item.key)
    );
    setMenuList(filterRes);
  }

  useEffect(() => {
    filterRouter(menuList);
  }, []);
  useLayoutEffect(() => {
    breadSite(pathname);
  }, [pathname]);
  return (
    <Menu
      key={crtPath}
      theme="light"
      onSelect={menuSelectCb}
      mode="inline"
      className={mergeClassName(
        styleScope["menu-box"],
        "pt-[.1rem] px-[.1rem]"
      )}
      defaultOpenKeys={crtPath}
      defaultSelectedKeys={crtPath}
      items={menuList}
    />
  );
};
export default LayoutMenu;
