/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { mergeClassName, timeJoin } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
const modalStyles = {
  header: {
    marginBottom: ".24rem",
  },
  body: {
    gridTemplateColumns: `repeat(4, 1fr)`,
    gap: ".15rem",
    paddingInline: ".5rem",
  },
};

const OperationRecords = (props) => {
  let [stop] = useStopPropagation();
  let filterTime = useRef<any>();
  let tableRefEl = useRef<any>();
  function filterCb() {
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.updateParmas(
      {
        // beginTime: time[0] || null,
        // endTime: time[1] || null,
        beginTime: timeJoin(time[0]),
        endTime: timeJoin(time[1], true),
      },
      {
        current: 1,
        pageSize: 10,
      }
    );
  }
  function paginationCb({ current, pageSize, total }) {
    let time = filterTime.current?.timeStr ?? [];
    tableRefEl.current.updateParmas(
      {
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
  return (
    <>
      <div className={styleScope["filter-box"]}>
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
        <TableScope {...props} ref={tableRefEl} onPaginationCb={paginationCb} />
      </div>
    </>
  );
};
export default OperationRecords;
