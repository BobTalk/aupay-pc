import { Tabs } from "antd";
import { useEffect, useState } from "react";

const StaffDetail = () => {
  let [defaultActiveKey, setDefaultActiveKey] = useState("baseInfo");
  let [currentModule, setCurrentModule] = useState();
  const items = [
    {
      key: `baseInfo`,
      label: "基本信息",
    },
    {
      key: `setPermission`,
      label: "权限设定",
    },
    {
      key: `operationRecords`,
      label: "操作记录",
    },
  ];
  function onChange(key: string) {
    setDefaultActiveKey(key);
  }
  useEffect(() => {
    import(`./${defaultActiveKey}`).then((res) => {
      setCurrentModule(res.default);
    });
  }, [defaultActiveKey]);
  return (
    <>
      <Tabs
        className="bg-[var(--white)] px-[.24rem] rounded-[.08rem]"
        defaultActiveKey={defaultActiveKey}
        items={items}
        onChange={onChange}
      />
      {currentModule}
    </>
  );
};

export default StaffDetail;
