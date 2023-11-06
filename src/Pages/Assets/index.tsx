/**
 * @summary 资产统计
 */
import Card from "@/Components/Card";
import whiteBg from "@/assets/images/white-bg.png";
import bgBlueLogo from "@/assets/images/blue_bg.svg";
import bgPinkLogo from "@/assets/images/pink_bg.svg";
import bgLogo from "@/assets/images/yellow_bg.svg";
import totalAssets from "@/assets/images/total_assets.svg";
import ozbetAssets from "@/assets/images/ozbet_assets.svg";
import drawAssets from "@/assets/images/draw_addr.svg";
import drawAddrIcon from "@/assets/images/draw_addr-icon.svg";
import transferAddrIcon from "@/assets/images/transfer_addr-icon.svg";
import transferAddrChart from "@/assets/images/transfer_addr-chart.svg";
import reserveAssetsIcon from "@/assets/images/reserve_assets-icon.svg";
import reserveAssetsChart from "@/assets/images/reserve_assets-chart.svg";
import drawAddrChart from "@/assets/images/draw_addr-chart.svg";
import styleScope from "./index.module.less";
import Image from "@/Components/Image";
import { mergeClassName } from "@/utils/base";
import { FindUserAssetsCollectionConfigInterFace } from "@/api";
import { useEffect } from "react";
const AssetsCount = () => {
  let imgList = [bgBlueLogo, bgPinkLogo, bgLogo];
  let iconList = [totalAssets, ozbetAssets, drawAssets];
  let bIconList = [drawAddrIcon, transferAddrIcon, reserveAssetsIcon];
  let bChartList = [drawAddrChart, transferAddrChart, reserveAssetsChart];
  let topModuleData = [
    {
      amount: "681,299.00",
      unit: "USDT",
      title: "auPay总资产",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "191,793.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "108,129.00",
          unit: "USDT",
        },
      ],
    },
    {
      amount: "190,289.00",
      unit: "USDT",
      title: "Ozbet资产",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "107,378.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "215,687.00",
          unit: "USDT",
        },
      ],
    },
    {
      amount: "291,872.00",
      unit: "USDT",
      title: "Ozbet提币地址",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "361,920.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "211,909.00",
          unit: "USDT",
        },
      ],
    },
  ];
  let bottomModuleData = [
    {
      amount: "109,230.00",
      unit: "USDT",
      title: "auPay提币地址",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "100,901.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "91,793.00",
          unit: "USDT",
        },
      ],
    },
    {
      amount: "298,099.00",
      unit: "USDT",
      title: "auPay中转地址",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "131,793.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "166,701.00",
          unit: "USDT",
        },
      ],
    },
    {
      amount: "71,393.00",
      unit: "USDT",
      title: "auPay储备资产",
      detailData: [
        {
          title: "USDT-ERC20",
          amount: "21,989.00",
          unit: "USDT",
        },
        {
          title: "USDT-ERC20",
          amount: "30,902.00",
          unit: "USDT",
        },
      ],
    },
  ];
  function getPageList() {
    FindUserAssetsCollectionConfigInterFace().then((res) => {
      console.log("res: ", res);
    });
  }
  useEffect(() => {
    getPageList();
  }, []);
  return (
    <>
      <Card
        bgImg={whiteBg}
        className="bg-no-repeat bg-bottom p-[0_.24rem_.18rem]"
        style={{
          backgroundSize: "100% 1.8rem",
        }}
      >
        <div className="flex items-center gap-[.24rem] mb-[.17rem]">
          {imgList.map((item, index) => (
            <TopCardList
              imgUrl={item}
              index={index}
              className={"module" + "_" + index}
              data={topModuleData[index]}
              iconUrl={iconList[index]}
              key={item + "_" + iconList[index]}
            />
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-[.24rem] mt-[.24rem]">
        {bottomModuleData.map((item, index) => (
          <BottomCardList
            key={item.title}
            icon={bIconList[index]}
            chart={bChartList[index]}
            data={item}
          />
        ))}
      </div>
    </>
  );
};
const BottomCardList = (props) => {
  let { icon, chart, data } = props;
  return (
    <div className="flex-1 p-[.34rem_.34rem_.22rem] bg-[var(--white)] rounded-[var(--border-radius)]">
      <div className="flex items-center justify-between gap-[.1rem]  pb-[.21rem]">
        <div className="flex flex-1 items-center">
          <img className="w-[.48rem] h-[.45rem]" src={icon} alt="" />
          <div className="pl-[.13rem] inline-size flex-auto">
            <p className={styleScope["b-title"]}>{data.title}</p>
            <p className={styleScope["b-amount"]}>
              <span>{data.amount}</span>
              <span>{data.unit}</span>
            </p>
          </div>
        </div>
        <img src={chart} className="w-[36%]" alt="" />
      </div>
      <div className="border-t-[1px] border-dashed border-[var(--border-color)] pt-[.0873rem]">
        {data?.detailData?.map((item, index) => (
          <div
            key={data.title + "B" + index}
            className="flex items-center  justify-between mt-[.16rem]"
          >
            <span className={styleScope["b-title"]}>{item.title}</span>
            <p className={styleScope["b-amount"]}>
              <span>{item.amount}</span>
              <span>{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
const TopCardList = (props) => {
  let { imgUrl, iconUrl, data, index: parentIndex } = props;
  return (
    <Card
      bgImg={imgUrl}
      className={mergeClassName(
        styleScope[`shadow${parentIndex}`],
        "flex-1 bg-no-repeat h-full flex flex-col"
      )}
      style={{
        backgroundSize: "cover",
        minHeight: "2.25rem",
      }}
    >
      <Image
        src={iconUrl}
        className="grid place-content-center p-[.345rem] place-content-start grid-cols-[auto_1fr] gap-x-[.245rem] items-center"
      >
        <div className="text-[var(--white)]">
          <p className={styleScope["amount"]}>
            {data.amount}
            {data.unit}
          </p>
          <p className={styleScope["title"]}>{data.title}</p>
        </div>
      </Image>
      <div
        className={mergeClassName(
          styleScope[`detail-info`],
          styleScope[`detail${parentIndex}`],
          "flex"
        )}
      >
        {data?.detailData.map((item, idx) => (
          <div key={idx}>
            <p>{item.title}</p>
            <p>
              {item.amount}
              {item.unit}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
export default AssetsCount;
