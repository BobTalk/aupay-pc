import { BarChart } from "@/Components/Charts";
import BarInitOptions from "./assetscount-mock.js";
import dayjs from "dayjs";
const AssetsCount = ({ data }) => {
  function chartDataFormat(list = []) {
    BarInitOptions.dataset.source = list.reduce((prv, next) => {
      prv.push({
        date: dayjs(next.date).format("YY/MM/DD"),
        流入: next.usdtFlowIn,
        流出: next.usdtFlowOut,
        当前资产: next.assetsOfUsdtAmount,
      });
      return prv;
    }, []);
    return BarInitOptions;
  }
  return (
    <BarChart
      style={{
        width: "100%",
        height: "100%",
      }}
      option={chartDataFormat(data)}
    />
  );
};
export default AssetsCount;
