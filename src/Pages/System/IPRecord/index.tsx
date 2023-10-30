/**
 * @summary 地址
 */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableScope from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import ModalScope from "@/Components/Modal";
import { useRef, useState } from "react";
import { useStopPropagation } from "@/Hooks/StopPropagation";
import Icon from "@/Components/Icon";
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
const IpSystemRecord = () => {
  let [stop] = useStopPropagation();

  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input placeholder="备注" size="large" className="w-[3.2rem]" />
        <RangePicker size="large" />
        <Button type="primary" size="large" icon={<SearchOutlined />}>
          查询
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableScope />
      </div>
    </>
  );
};
export default IpSystemRecord;
