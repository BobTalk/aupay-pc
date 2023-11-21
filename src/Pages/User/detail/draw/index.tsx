/**
 * @summary 充币
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { formatEnum, mergeClassName, timeJoin } from "@/utils/base";
import { assetsTypeEnum, assetsTypeJumpEnum } from "@/Enum";
import { useRef } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const Draw = () => {
  let assetsTypeJumpEnumObj = JSON.parse(JSON.stringify(assetsTypeJumpEnum));
  const filterNote = useRef<any>();
  const filterTime = useRef<any>();
  const tableRefEl = useRef<any>();
  const assetsType = useRef();
  const [stop] = useStopPropagation();
  function jumpCb(e, crt) {
    stop(e, () => {
      if (!crt["chainTxId"]) return;
      window.open(
        assetsTypeJumpEnumObj[crt["agreement"]] + crt["chainTxId"],
        "_blank"
      );
    });
  }
  function filterCb() {
    let note = filterNote.current.input?.value;
    let time = filterTime.current?.timeStr ?? [];
    console.log("filterTime.current: ", filterTime.current);
    console.log("time: ", time);
    tableRefEl.current.getTableList({
      search: note || null,
      // beginTime: time[0] || null,
      // endTime: time[1] || null,
      beginTime: timeJoin(time[0]),
      endTime: timeJoin(time[1], true),
      currencyId: assetsType.current,
    });
  }
  function paginationCb({ current, pageSize, total }) {
    let note = filterNote.current.input?.value;
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.updateParmas(
      {
        search: note || null,
        // beginTime: time[0] || null,
        // endTime: time[1] || null,
        beginTime: timeJoin(time[0]),
        endTime: timeJoin(time[1], true),
        currencyId: assetsType.current,
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          allowClear
          placeholder="地址/交易ID"
          ref={filterNote}
          size="large"
          className="w-[3.2rem]"
        />
        <Button
          type="primary"
          size="large"
          onClick={filterCb}
          className="mr-[.06rem]"
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Select
          size="large"
          allowClear
          onChange={(val) => (assetsType.current = val)}
          placeholder="资产类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
        />
        <RangePicker ref={filterTime} size="large" />
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
export default Draw;
