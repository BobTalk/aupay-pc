/**
 * @summary 地址
 */
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select } from "antd";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import TableComp from "@/Components/Table";
import { dataSource, columns, pagination } from "./table-mock.jsx";
import geenIcon from "./images/green-icon.svg";
import blueIcon from "./images/blue-icon.svg";
import { formatEnum, mergeClassName } from "@/utils/base";
import { assetsTypeEnum, tradeTypeEnum } from "@/Enum";
const ReserveAssets = () => {
  return (
    <>
      <div className={styleScope["total-info"]}>
        <div className="bg-[var(--white)] p-[.27rem_0.24rem] rounded-[.06rem]">
          <div className="flex items-center">
            <img src={geenIcon} alt="" className="w-[.48rem] h-[.48rem]" />
            <div className="ml-[.13rem] mr-[.53rem]">
              <p className={styleScope["type"]}>USDT-ERC20</p>
              <p className={styleScope["addr"]}>
                wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd
              </p>
            </div>
          </div>
          <hr className="w-full h-full bg-[var(--border-color)]" />
          <div className="ml-[.53rem] h-full flex flex-col justify-between">
            <p className="flex justify-between">
              <span className={styleScope["aseets-name"]}>实际资产</span>
              <span className={styleScope["assets-num"]}>100,901.00USDT</span>
            </p>
            <p className="flex justify-between">
              <span className={styleScope["aseets-name"]}>矿工费</span>
              <span className={styleScope["assets-num"]}>91,793.00ETH</span>
            </p>
          </div>
        </div>
        <div className="bg-[var(--white)] p-[.27rem_0.24rem] rounded-[.06rem]">
          <div className="flex items-center">
            <img src={blueIcon} alt="" className="w-[.48rem] h-[.48rem]" />
            <div className="ml-[.13rem] mr-[.53rem]">
              <p className={styleScope["type"]}>USDT-TRC20</p>
              <p className={styleScope["addr"]}>
                wrijwfnwm0isd992rsdwrijwfnwm0isd992rsd
              </p>
            </div>
          </div>
          <hr className="w-full h-full bg-[var(--border-color)]" />
          <div className="ml-[.53rem] h-full flex flex-col justify-between">
            <p className="flex justify-between">
              <span className={styleScope["aseets-name"]}>实际资产</span>
              <span className={styleScope["assets-num"]}>100,901.00USDT</span>
            </p>
            <p className="flex justify-between">
              <span className={styleScope["aseets-name"]}>矿工费</span>
              <span className={styleScope["assets-num"]}>91,793.00TRX</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styleScope["filter-box"]}>
        <Input
          placeholder="订单号/地址/交易ID"
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
export default ReserveAssets;
