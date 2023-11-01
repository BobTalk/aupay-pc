import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";

const StaffDetail = () => {
  const tabsRef = useRef<any>();
  let [defaultActiveKey, setDefaultActiveKey] = useState("baseInfo");
  let [currentModule, setCurrentModule] = useState();
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
    import(`./${defaultActiveKey}`).then((res) => {
      setCurrentModule(res.default);
    });
  }, [defaultActiveKey]);
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
        {currentModule}
      </div>
    </>
  );
};

export default StaffDetail;
