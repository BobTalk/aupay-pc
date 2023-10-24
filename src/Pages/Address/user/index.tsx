/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableComp from "@/Components/Table";
import { dataSource, columns, pagination } from "./table-mock.jsx";
import { mergeClassName } from "@/utils/base";
const UserAddress = () => {
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Input placeholder="auPay用户名/地址" size="large" className="w-[3.2rem]" />
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
          options={[]}
        />
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
export default UserAddress;
