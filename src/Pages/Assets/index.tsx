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
import { formatUnit, mergeClassName } from "@/utils/base";
import {
  GetReserveWalletInfoInterFace,
  GetWithdrawWalletInfoInterFace,
  GetTransferWalletWalletInfoInterFace,
  GetApplicaitonWithdrawWalletInfoInterFace,
  GetApplicaitonAssetsWalletInfoInterFace,
} from "@/api";
import { useEffect, useLayoutEffect, useState } from "react";
const AssetsCount = () => {
  let imgList = [bgBlueLogo, bgPinkLogo, bgLogo];
  let iconList = [totalAssets, ozbetAssets, drawAssets];
  let bIconList = [drawAddrIcon, transferAddrIcon, reserveAssetsIcon];
  let bChartList = [drawAddrChart, transferAddrChart, reserveAssetsChart];

  let [bottomModuleData, setBottomModuleData] = useState([]);
  let [topModuleData, setTopModuleData] = useState([]);
  function dataFormat(res, index, title, setFn) {
    let filterData = res?.data?.filter((item) => item.currencyId == 3) ?? [];
    let { detailData, amount } = filterData.reduce(
      (prv, next) => {
        let { agreement, type } = formatUnit(
          next.currencyId,
          next.currencyChain
        );

        let findObj = prv.detailData.find((item) => item.title == agreement);
        if (findObj) {
          findObj.amount += next.balance;
        } else {
          prv.detailData.push({
            title: agreement,
            amount: next.balance,
            unit: type,
          });
        }
        prv.amount += next.balance;
        return prv;
      },
      { detailData: [], amount: 0 }
    );
    setFn((initVal) => {
      if (!initVal[index]) initVal[index] = {};
      initVal[index] = {
        amount: amount,
        unit: "USDT",
        title,
        detailData: detailData,
      };
      return [...initVal];
    });
  }
  async function getPageList() {
    // 储备资产
    let res = await GetReserveWalletInfoInterFace();
    // 提币地址
    let res1 = await GetWithdrawWalletInfoInterFace();
    // 中转地址
    let res2 = await GetTransferWalletWalletInfoInterFace();
    // 提款地址
    let res3 = await GetApplicaitonWithdrawWalletInfoInterFace();
    // 资产地址
    let res4 = await GetApplicaitonAssetsWalletInfoInterFace();
    dataFormat(res1, 0, "auPay提币地址", setBottomModuleData);
    dataFormat(res2, 1, "auPay中转地址", setBottomModuleData);
    dataFormat(res, 2, "auPay储备资产", setBottomModuleData);
    dataFormat(
      {
        data: [...res1.data, ...res2.data, ...res.data],
      },
      0,
      "auPay总资产",
      setTopModuleData
    );
    dataFormat(res3, 1, "Ozbet资产", setTopModuleData);
    dataFormat(res4, 2, "Ozbet提币地址", setTopModuleData);
  }
  useLayoutEffect(() => {
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
        <div className="flex items-center gap-[.24rem] mb-[.17rem] max-w-[]">
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
            key={item?.title}
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
  let { icon, chart, data = {} } = props;
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
              <span>{item?.amount}</span>
              <span>{item.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
const TopCardList = (props) => {
  let { imgUrl, iconUrl, data = {}, index: parentIndex } = props;

  return (
    <Card
      bgImg={imgUrl}
      className={mergeClassName(
        styleScope[`shadow${parentIndex}`],
        "flex-1 bg-no-repeat h-full flex flex-col max-w-[33.3333%]"
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
            {data?.amount}
            {data.unit}
          </p>
          <p className={styleScope["title"]}>{data.title}</p>
        </div>
      </Image>
      <ChildList parentIndex={parentIndex} list={data.detailData} />
    </Card>
  );
};
const ChildList = ({ parentIndex, list = [] }) => {
  const splitLen = 5;
  function arrToTwoDimerndional(oldArr): any[] {
    let num = 1,
      temp = 0,
      newArr = [];
    oldArr.forEach((item, ind) => {
      if (ind % splitLen == 0) {
        newArr.push(oldArr.slice(temp, splitLen * num));
        temp += splitLen;
        num += 1;
      }
    });
    return newArr;
  }
  function autoColumns(list) {
    if (list.length > splitLen) {
      return `repeat(${splitLen}, minmax(0, 1fr))`;
    }
    return `repeat(${list.length}, minmax(0, 1fr))`;
  }

  return arrToTwoDimerndional(list).map((arrItem, index) => (
    <div
      key={arrItem.length + "_" + index}
      className={mergeClassName(
        styleScope[`detail-info`],
        styleScope[`detail${parentIndex}`],
        "grid"
      )}
      style={{
        gridTemplateColumns: autoColumns(list),
      }}
    >
      {arrItem.map((item, idx) => (
        <div key={idx}>
          <p>{item.title}</p>
          <p>
            {item.amount}
            {item.unit}
          </p>
        </div>
      ))}
    </div>
  ));
};
export default AssetsCount;
