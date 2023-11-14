/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const UserAddress = () => {
  let [stop] = useStopPropagation();
  let [assetsListType, setAssetsListType] = useState([]);
  let searchInputRefs = useRef<any>();
  let tableRefEl = useRef<any>();
  let [assetsType, setAssetsType] = useState();
  function getAssetsList(list) {
    setAssetsListType(list);
  }
  function paginationCb({ current, pageSize, total }) {
    tableRefEl.current.updateParmas(
      {
        search: searchInputRefs.current.input.value || null,
        tradeType: assetsType,
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  function filterCb(e, val) {
    stop(e, () => {
      tableRefEl.current.getTableList({
        search: val,
        currencyId: assetsType,
      });
    });
  }
  function filterCb1(e, val) {
    stop(e, () => {
      tableRefEl.current.getTableList({
        currencyId: val,
        search: searchInputRefs.current.input.value || null,
      });
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          ref={searchInputRefs}
          allowClear
          placeholder="auPay用户名/地址"
          size="large"
          className="w-[3.2rem]"
        />
        <Button
          type="primary"
          size="large"
          className="mr-[.06rem]"
          onClick={(e) => filterCb(e, searchInputRefs.current.input.value)}
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Select
          size="large"
          allowClear
          placeholder="资产类型"
          onChange={(val) => setAssetsType(val)}
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={assetsListType}
        />
        <Button
          onClick={(e) => filterCb1(e, assetsType)}
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
        <TableScope
          ref={tableRefEl}
          onPaginationCb={paginationCb}
          onGetAssetsList={getAssetsList}
        />
      </div>
    </>
  );
};
export default UserAddress;
