import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import BaseInfo from "./baseInfo";
import SetPermission from "./setPermission";
import OperationRecords from "./operationRecords";
const StaffDetail = () => {
  const tabsRef = useRef<any>();
  let [defaultActiveKey, setDefaultActiveKey] = useState("baseInfo");
  let [tabsHeight, setTabsHeight] = useState();
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
    let { height } = tabsRef.current.getBoundingClientRect();
    setTabsHeight(height);
  }, []);
  return (
    <>
      <div ref={tabsRef}>
        <Tabs
          className="bg-[var(--white)] px-[.24rem] rounded-[.08rem]"
          defaultActiveKey={defaultActiveKey}
          items={items}
          onChange={onChange}
        />
      </div>
      <div
        style={{
          height: `calc(100% - ${tabsHeight}px - .24rem)`,
        }}
      >
        {defaultActiveKey == "baseInfo" ? (
          <BaseInfo />
        ) : defaultActiveKey == "setPermission" ? (
          <SetPermission />
        ) : (
          <OperationRecords />
        )}
      </div>
    </>
  );
};

export default StaffDetail;
