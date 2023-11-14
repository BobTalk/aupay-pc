/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import styleScope from "./index.module.less";
import TableComp from "./table-mock.jsx";
import { formatEnum, mergeClassName } from "@/utils/base";
import { assetsTypeEnum } from "@/Enum";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const DrawAddress = () => {
  const assetsTypeId = useRef<any>();
  const tableRefs = useRef<any>();
  let [stop] = useStopPropagation();
  function assetsTypeChange(val) {
    assetsTypeId.current = +val || null;
  }
  function filterCb(e) {
    stop(e, () => {
      tableRefs.current.getTableList({ currencyId: assetsTypeId.current });
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]} hidden>
        <Select
          size="large"
          allowClear
          onChange={assetsTypeChange}
          placeholder="资产类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
        />

        <Button
          onClick={filterCb}
          type="primary"
          size="large"
          icon={<SearchOutlined />}
        >
          查询
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableComp ref={tableRefs} />
      </div>
    </>
  );
};
export default DrawAddress;
