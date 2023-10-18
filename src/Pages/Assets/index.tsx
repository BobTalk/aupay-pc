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
import styleScope from "./index.module.less";
import Image from "@/Components/Image";
import { mergeClassName } from "@/utils/base";
const AssetsCount = () => {
  let imgList = [bgBlueLogo, bgPinkLogo, bgLogo];
  let iconList = [totalAssets, ozbetAssets, drawAssets];
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

      
    </>
  );
};
const TopCardList = (props) => {
  let { imgUrl, iconUrl, data, index: parentIndex } = props;
  console.log('parentIndex: ', parentIndex);
  return (
    <Card
      bgImg={imgUrl}
      className={mergeClassName(styleScope[`shadow${parentIndex}`],"flex-1 bg-no-repeat h-full flex flex-col")}
      style={{
        backgroundSize: "cover",
        minHeight: "2.25rem",
      }}
    >
      <Image
        src={iconUrl}
        className="p-[.345rem] place-content-start grid-cols-[auto_1fr] gap-x-[.245rem] items-center"
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
