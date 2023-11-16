/**
 * @summary 充币
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, message } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { formatEnum, mergeClassName } from "@/utils/base";
import {
  assetsTypeEnum,
  tradeTypeChangeEnum,
  assetsTypeJumpEnum,
} from "@/Enum";
import { useRef } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Trade = () => {
  let assetsTypeJumpEnumObj = JSON.parse(JSON.stringify(assetsTypeJumpEnum));
  let [stop] = useStopPropagation();
  const tableRefEl = useRef<any>();
  const assetsType = useRef<any>();
  const tradeType = useRef<any>();
  const inputRefs = useRef<any>();
  const timeRefs = useRef<any>();
  function paginationCb({ current, pageSize, total }) {
    getInfo({ current, pageSize, total });
  }
  function filterCb(e) {
    stop(e, () => {
      getInfo();
    });
  }
  function getInfo(pagination = {}) {
    let inputVal = inputRefs.current.input.value || null;
    let assetsTypeVal = assetsType.current || null;
    let tradeTypeVal = tradeType.current || null;
    let timeRefsArr = timeRefs.current.timeStr || [];
    tableRefEl.current.getTableList(
      {
        search: inputVal,
        beginTime: timeRefsArr[0] || null,
        endTime: timeRefsArr[1] || null,
        currencyId: +assetsTypeVal || null,
        tradeType: +tradeTypeVal || null,
      },
      pagination
    );
  }
  function jumpCb(e, crt) {
    stop(e, () => {
      if (!crt["chainTxId"]) {
        message.error("对应数据ID不存在");
        return;
      }
      window.open(
        assetsTypeJumpEnumObj[crt["agreement"]] + crt["chainTxId"],
        "_blank"
      );
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          allowClear
          ref={inputRefs}
          placeholder="地址/交易ID"
          size="large"
          className="w-[3.2rem]"
        />
        <Button
          type="primary"
          size="large"
          className="mr-[.06rem]"
          onClick={filterCb}
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Select
          size="large"
          allowClear
          onChange={(value) => (assetsType.current = value)}
          placeholder="资产类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
        />
        <Select
          size="large"
          allowClear
          onChange={(value) => (tradeType.current = value)}
          placeholder="交易类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(tradeTypeChangeEnum)}
        />
        <RangePicker ref={timeRefs} size="large" />
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
        <TableScope
          ref={tableRefEl}
          onJump={jumpCb}
          onPaginationCb={paginationCb}
        />
      </div>
    </>
  );
};
export default Trade;
