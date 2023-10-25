/**
 * @summary 地址
 */
import { SwapOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styleScope from "./index.module.less";

import TableConfig from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
const MinerFeesAddress = () => {
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Button type="primary" size="large" icon={<SwapOutlined />}>
          转账记录
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableConfig />
      </div>
    </>
  );
};
export default MinerFeesAddress;
