import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
const Activation = (props) => {
  console.log('props: ', props);
  let { data } = props
  console.log('data>>>: ', data);
  let {
    sumRegisterCount,
    todayRegisterCount,
    yesterdayRegisterCount,
    weekRegisterCount,
    monthRegisterCount,
    yesterdayActiveCount,
    todayActiveCount,
    weekActiveCount,
    monthActiveCount,
  } = data ?? {};
  let activationList = [
    {
      title: "总注册",
      num: sumRegisterCount ?? 0,
    },
    {
      title: "昨日注册",
      num: yesterdayRegisterCount ?? 0,
    },
    {
      title: "今日注册",
      num: todayRegisterCount ?? 0,
    },
    {
      title: "7日注册",
      num: weekRegisterCount ?? 0,
    },
    {
      title: "30日注册",
      num: monthRegisterCount ?? 0,
    },
    {
      title: "昨日活跃度",
      num: yesterdayActiveCount ?? 0,
    },
    {
      title: "今日活跃度",
      num: todayActiveCount ?? 0,
    },
    {
      title: "周均活跃度",
      num: weekActiveCount ?? 0,
    },
    {
      title: "月均活跃度",
      num: monthActiveCount ?? 0,
    },
  ];
  
  return (
    <div
      className="grid grid-cols-3 grid-rows-3 gap-[.16rem] place-items-center]"
      style={{ height: "calc(100% - .56rem)" }}
    >
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
  );
};

export default Activation;
