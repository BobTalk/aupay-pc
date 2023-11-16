import { BarChart } from "@/Components/Charts";
import { useState } from "react";
const AssetsTrend = (props) => {
  let [chartOptions, setChartOptions] = useState({});
  return (
    <BarChart
      style={{
        width: "100%",
        height: "100%",
      }}
      option={chartOptions}
    />
  );
};
export default AssetsTrend;
