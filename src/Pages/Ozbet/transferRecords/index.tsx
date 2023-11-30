/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableConfig from "./table-mock.jsx";
import { formatEnum, mergeClassName, timeJoin } from "@/utils/base";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { assetsTypeEnum, tradeTypeEnum } from "@/Enum";
const TransferRecord = (props) => {
  let { walletUse } = props;
  let [stop] = useStopPropagation();
  const tableRefs = useRef<any>({});
  const filterOrderOrAddrOrBussion = useRef<any>();
  const rangePickerRefs = useRef<any>();
  // let [assetsType, setAssetsType] = useState();
  let assetsType = useRef();
  // let [tradeType, setTradeType] = useState();
  let tradeType = useRef();
  const filterInfo = useRef<any>({});

  function filterListInfo(e, key, value) {
    stop(e, () => {
      filterInfo.current[key] = value || null;
      tableRefs.current.getTableList(filterInfo.current);
    });
  }
  function searchByFilter() {
    let [beginTime, endTime] = rangePickerRefs.current.timeStr ?? [];
    filterInfo.current = {
      ...filterInfo.current,
      currencyId: assetsType.current || null,
      currencyChain: null,
      // beginTime: beginTime || null,
      // endTime: endTime || null,
      beginTime: timeJoin(beginTime),
      endTime: timeJoin(endTime, true),

      tradeType: tradeType.current || null,
    };
    tableRefs.current.getTableList(filterInfo.current);
  }
  function paginationCb({ current, pageSize, total }) {
    tableRefs.current.getTableInfo(filterInfo.current, {
      current,
      pageSize,
      total,
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          placeholder="订单号/地址/交易ID/地址说明"
          size="large"
          ref={filterOrderOrAddrOrBussion}
          allowClear
          className="w-[3.2rem]"
        />
        <Button
          type="primary"
          size="large"
          className="mr-[.06rem]"
          onClick={(e) =>
            filterListInfo(
              e,
              "search",
              filterOrderOrAddrOrBussion.current.input.value
            )
          }
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Select
          size="large"
          allowClear
          placeholder="资产类型"
          onChange={(val) => (assetsType.current = val)}
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
        />
        <Select
          size="large"
          allowClear
          placeholder="交易类型"
          onChange={(val) => (tradeType.current = val)}
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(tradeTypeEnum)}
        />
        <RangePicker ref={rangePickerRefs} size="large" />
        <Button
          type="primary"
          onClick={searchByFilter}
          size="large"
          icon={<SearchOutlined />}
        >
          查询
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableConfig
          id={walletUse}
          ref={tableRefs}
          onPaginationCb={paginationCb}
        />
      </div>
    </>
  );
};
export default TransferRecord;
