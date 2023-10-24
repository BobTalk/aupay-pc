import { Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
    navigate(key);
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
