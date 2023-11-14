/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableComp from "@/Components/Table";
import { dataSource, columns, pagination } from "./table-mock.jsx";
import { formatEnum, mergeClassName } from "@/utils/base";
import { assetsTypeEnum, tradeTypeEnum } from "@/Enum";
const TransferRecord = () => {
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input
          placeholder="订单号/地址/交易ID/地址说明"
          size="large"
          className="w-[3.2rem]"
        />
        <Button
          type="primary"
          size="large"
          className="mr-[.06rem]"
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
        <Select
          size="large"
          placeholder="资产类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
        />
        <Select
          size="large"
          placeholder="交易类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(tradeTypeEnum)}
        />
        <RangePicker size="large" />
        <Button type="primary" size="large" icon={<SearchOutlined />}>
          查询
        </Button>
      </div>
      <div
        className={mergeClassName("bg-[var(--white)]", styleScope["table-box"])}
      >
        <TableComp
          themeObj={{
            headerBorderRadius: 0,
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
        />
      </div>
    </>
  );
};
export default TransferRecord;
