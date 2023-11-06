import { Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import {
  activePath,
  activePathToName,
} from "@/Pages/Layout/activeRouterConfig";
const UserDetail = () => {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  const publicUrl = "/aupay/user/detail/";
  const items = [
    {
      key: `${publicUrl}user`,
      label: "用户详情",
    },
    {
      key: `${publicUrl}recharge`,
      label: "充币记录",
    },
    {
      key: `${publicUrl}draw`,
      label: "提币记录",
    },
    {
      key: `${publicUrl}trade`,
      label: "交易记录",
    },
    {
      key: `${publicUrl}assetsChanges`,
      label: "资产变动记录",
    },
  ];
  function onChange(key: string) {
    let activeKey = activePathToName[key];
    let activeP = activePath[key];
    navigate(key);
    if (activeKey.length > 1) {
      let res = activeKey.map((item, idx, arr) => {
        return idx === arr.length - 1
          ? { title: item }
          : { title: item, href: activeP[idx] };
      });
      store.dispatch({ type: "ADD_BREADCRUMB", data: res});
    } else {
      store.dispatch({
        type: "ADD_BREADCRUMB",
        data: [{ title: activePathToName[key][0] }],
      });
    }
  }
  return (
    <>
      <Tabs
        className="bg-[var(--white)] px-[.24rem] rounded-[.08rem]"
        defaultActiveKey={pathname}
        items={items}
        onChange={onChange}
      />
      <Outlet />
    </>
  );
};

export default UserDetail;
