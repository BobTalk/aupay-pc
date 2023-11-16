import options from "./paycount-mock.js";
import { LineChart } from "@/Components/Charts";
import dayjs from "dayjs";
const PayCount = ({ data }) => {
  function chartDataFormat(list = []) {
    options.dataset.source = list.reduce((prv, next) => {
      prv.push({
        date: dayjs(next.date).format("YY/MM/DD"),
        快捷支付数量: next.fastPayAmount,
        快捷支付笔数: next.fastPayNum,
      });
      return prv;
    }, []);
    return options;
  }
  return (
    <LineChart
      style={{
        width: "100%",
        height: "100%",
      }}
      option={chartDataFormat(data)}
    />
  );
};
export default PayCount;
