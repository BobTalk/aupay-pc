import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import RangePicker from "@/Components/RangePicker";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { BarChart, LineChart } from "@/Components/Charts";
import BarOptions from "./mock.js";
import BarOptions1 from "./mock2.js";
import LineOptions from "./mock1.js";
import { useEffect, useRef } from "react";
const DataCount = () => {
  let activationList = [
    {
      title: "总注册",
      num: 67189,
    },
    {
      title: "昨日注册",
      num: 2305,
    },
    {
      title: "今日注册",
      num: 1208,
    },
    {
      title: "7日注册",
      num: 2102,
    },
    {
      title: "30日注册",
      num: 30819,
    },
    {
      title: "昨日活跃度",
      num: 3091,
    },
    {
      title: "今日活跃度",
      num: 3462,
    },
    {
      title: "周均活跃度",
      num: 12783,
    },
    {
      title: "月均活跃度",
      num: 23809,
    },
  ];
  return (
    <>
      <div
        className={mergeClassName(
          "grid gap-[.24rem] inline-size",
          styleScope["top-box"]
        )}
      >
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <p
            className={mergeClassName(
              styleScope["title"],
              styleScope["blue-line"],
              "mb-[.24rem]"
            )}
          >
            总注册-总活跃度
          </p>
          <div className="grid grid-cols-3 grid-rows-3 gap-[.16rem] place-items-center]" style={{ height: 'calc(100% - .56rem)' }}>
            {activationList.map((item) => (
              <div
                key={item.title + "_" + item.num}
                className={mergeClassName(
                  "bg-[var(--gray)] rounded-[.02rem] w-full h-full",
                  styleScope["item-box"]
                )}
              >
                <p className="text-center leading-[1.3]">{item.title}</p>
                <p className="text-center  leading-[1.3]">{item.num}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <p
              className={mergeClassName(
                styleScope["title"],
                styleScope["blue-line"]
              )}
            >
              auPay资产统计
            </p>
            <div>
              <RangePicker />
              <Button
                type="primary"
                className="ml-[.1rem]"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
            </div>
          </div>
          <div className="w-full" style={{ height: "calc(100% - .32rem)" }}>
            <BarChart
              style={{
                width: "100%",
                height: "100%",
              }}
              option={BarOptions}
            />
          </div>
        </div>
      </div>
      <div className={mergeClassName(styleScope["bottom-box"], " gap-[.24rem] mt-[.24rem] min-h-[4.74rem] inline-size")} >
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <p
              className={mergeClassName(
                styleScope["title"],
                styleScope["blue-line"]
              )}
            >
              支付Ozbet统计
            </p>
            <div>
              <RangePicker />
              <Button
                type="primary"
                className="ml-[.1rem]"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
            </div>
          </div>
          <div
            style={{
              height: "calc(100% - .32rem)",
              width: "100%",
            }}
          >
            <LineChart
              style={{
                width: "100%",
                height: "100%",
              }}
              option={LineOptions}
            />
          </div>
        </div>
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <p
              className={mergeClassName(
                styleScope["title"],
                styleScope["blue-line"]
              )}
            >
              auPay资产趋势
            </p>
            <div>
              <RangePicker />
              <Button
                type="primary"
                className="ml-[.1rem]"
                icon={<SearchOutlined />}
              >
                查询
              </Button>
            </div>
          </div>
          <div
            style={{
              height: "calc(100% - .32rem)",
              width: "calc(100% - .48rem)",
            }}
          >
            <BarChart
              style={{
                width: "100%",
                height: "100%",
              }}
              option={BarOptions1}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DataCount;
