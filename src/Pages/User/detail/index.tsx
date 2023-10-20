import { Tabs } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const UserDetail = () => {
  let navigate = useNavigate();
  const items = [
    {
      key: "user",
      label: "用户详情",
    },
    {
      key: "recharge",
      label: "充币记录",
    },
    {
      key: "draw",
      label: "提币记录",
    },
    {
      key: "trade",
      label: "交易记录",
    },
    {
      key: "assetsChanges",
      label: "资产变动记录",
    },
  ];
  function onChange(key: string) {
    console.log("key: ", key);
    navigate(`/aupay/user/detail/${key}`);
  }
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Outlet />
    </>
  );
};

export default UserDetail;
