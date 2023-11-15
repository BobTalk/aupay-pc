import { Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import store from "@/store";
import {
  activePath,
  activePathToName,
} from "@/Pages/Layout/activeRouterConfig";
import { useState } from "react";
const UserDetail = () => {
  let navigate = useNavigate();

  let {
    pathname,
    state: { chilterRouterArr, crtInfo },
  } = useLocation();

  let [childRouter] = useState(chilterRouterArr);
  function onChange(key: string) {
    let activeKey = activePathToName[key];
    let activeP = activePath[key];
    navigate(key, { state: { chilterRouterArr, crtInfo } });
    if (activeKey.length > 1) {
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
  return (
    <>
      <Tabs
        className="bg-[var(--white)] px-[.24rem] rounded-[.08rem]"
        defaultActiveKey={pathname}
        items={childRouter}
        onChange={onChange}
      />
      <Outlet key={pathname} {...crtInfo} />
    </>
  );
};

export default UserDetail;
