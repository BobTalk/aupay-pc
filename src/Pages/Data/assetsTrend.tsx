import { BarChart } from "@/Components/Charts";
import options from "./assetstrend-mock.js";
import dayjs from "dayjs";
const AssetsTrend = ({ data }) => {
  function chartDataFormat(list = []) {
    let { data, time } = list.reduce(
      (prv, next) => {
        prv.time.push(dayjs(next.date).format("YY/MM/DD"));
        prv.data.push({
          value: next.usdtFlowIn - next.usdtFlowOut,
          itemStyle: {
            color:
              next.usdtFlowIn - next.usdtFlowOut > 0 ? "#1C63FF" : "#00A8FF",
          },
        });
        return prv;
      },
      { data: [], time: [] }
    );
    options.xAxis.data = time;
    options.series[0].data = data;
    return options;
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
export default AssetsTrend;
