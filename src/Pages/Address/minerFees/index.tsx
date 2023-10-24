/**
 * @summary 地址
 */
import { SwapOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styleScope from "./index.module.less";
import { useState } from "react";
import TableComp from "@/Components/Table";
import { TableDataConfig } from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
import App from "./test";
const MinerFeesAddress = () => {
  let { dataSource, mergedColumns, pagination, componentsConfig } =
    TableDataConfig();
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
        <TableComp
          virtual={false}
          themeObj={{
            headerBorderRadius: 0,
          }}
          components={componentsConfig}
          dataSource={dataSource}
          columns={mergedColumns}
          pagination={pagination}
        />
        <App/>
      </div>
    </>
  );
};
export default MinerFeesAddress;
