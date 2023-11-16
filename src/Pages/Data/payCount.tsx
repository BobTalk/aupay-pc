import { useState } from "react";
import LineOptions from "./mock1.js";
import { LineChart } from "@/Components/Charts";
const PayCount = (props) => {
  let [chartOptions, setChartOptions] = useState({});
  return (
    <LineChart
      style={{
        width: "100%",
        height: "100%",
      }}
      option={chartOptions}
    />
  );
};
export default PayCount;
