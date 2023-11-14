/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import styleScope from "./index.module.less";
import TableComp from "@/Components/Table";
import { dataSource, columns, pagination } from "./table-mock.jsx";
import { formatEnum, mergeClassName } from "@/utils/base";
import { assetsTypeEnum } from "@/Enum";
const DrawAddress = () => {
  return (
    <>
      <div className={styleScope["filter-box"]}>
        <Select
          size="large"
          placeholder="资产类型"
          suffixIcon={<CaretDownOutlined />}
          style={{ width: "1.34rem" }}
          options={formatEnum(assetsTypeEnum)}
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
export default DrawAddress;
