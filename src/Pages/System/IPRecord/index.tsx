/**
 * @summary 地址
 */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { mergeClassName, timeJoin } from "@/utils/base";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import { useRef } from "react";
const IpSystemRecord = () => {
  const tableRefEl = useRef<any>();
  const filterNote = useRef<any>();
  const filterTime = useRef<any>();
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
      },
      {
        current,
        pageSize,
        total,
      }
    );
  }
  function callGetTableFn() {
    let note = filterNote.current.input?.value;
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.getTableList({
      search: note || null,
      // beginTime: time[0] || null,
      beginTime: timeJoin(time[0]),
      endTime: timeJoin(time[1], true),
      // endTime: time[1] || null,
    });
  }
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          allowClear
          ref={filterNote}
          placeholder="备注"
          size="large"
          className="w-[3.2rem]"
        />
        <RangePicker ref={filterTime} size="large" />
        <Button
          onClick={callGetTableFn}
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
        <TableScope ref={tableRefEl} onPaginationCb={paginationCb} />
      </div>
    </>
  );
};
export default IpSystemRecord;
