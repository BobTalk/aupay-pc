import { mergeClassName } from "@/utils/base";
import styleScope from "./index.module.less";
import Activation from "./activation";
import AssetsCount from "./assetsCount";
import PayCount from "./payCount";
import AssetsTrend from "./assetsTrend";
import Filter from "./filter";
import { useLayoutEffect, useState } from "react";
import {
  ActivationInterFace,
  FindAssetsDailyCountInterFace,
  FindBusinessCountListInterFace,
} from "@/api";
const DataCount = () => {
  let [activationInfo, setActivationInfo] = useState({});
  let [payCountInfo, setPayCountInfo] = useState([]);
  let [assetsCount, setAssetsCount] = useState([]);
  // 趋势  统计数据中 流入 - 流出
  let [assetsTrend, setAssetsTrend] = useState([]);
  function getActivation() {
    ActivationInterFace().then((res) => {
      console.log('res: ', res);
      setActivationInfo(res ?? {});
    });
  }
  // 资产统计
  function getAssetsCount(time) {
    FindAssetsDailyCountInterFace({
      conditions: {
        beginTime: time[0] ?? null,
        endTime: time[1] ?? null,
      },
    }).then((res) => {
      setAssetsCount(res?.data ?? []);
    });
  }
  // 资产趋势
  function getAssetsTrend(time) {
    FindAssetsDailyCountInterFace({
      conditions: {
        beginTime: time[0] ?? null,
        endTime: time[1] ?? null,
      },
    }).then((res) => {
      setAssetsTrend(res?.data ?? []);
    });
  }
  function payCount(time) {
    FindBusinessCountListInterFace({
      conditions: {
        beginTime: time[0] ?? null,
        endTime: time[1] ?? null,
      },
    }).then((res) => {
      setPayCountInfo(res?.data ?? []);
    });
  }
  function queryAssetsCountCb(time) {
    getAssetsCount(time);
  }
  function queryPayCountCb(time) {
    payCount(time);
  }
  function queryAssetsTrendCb(time) {
    getAssetsTrend(time);
  }
  useLayoutEffect(() => {
    getActivation();
    getAssetsCount([]);
    payCount([]);
    getAssetsTrend([]);
  }, []);
  return (
    <>
      <div
        className={mergeClassName(
          "grid gap-[.24rem] inline-size",
          styleScope["top-box"]
        )}
      >
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <Filter showFilter={false} title="总注册-总活跃度" />
          <Activation data={activationInfo} />
        </div>
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <Filter onQuery={queryAssetsCountCb} title="auPay资产统计" />
          </div>
          <div className="w-full" style={{ height: "calc(100% - .32rem)" }}>
            <AssetsCount data={assetsCount} />
          </div>
        </div>
      </div>
      <div
        className={mergeClassName(
          styleScope["bottom-box"],
          " gap-[.24rem] mt-[.24rem] h-[4.74rem] inline-size"
        )}
      >
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <Filter
              onQuery={queryPayCountCb}
              title="支付Ozbet统计"
              showShortcutKey
            />
          </div>
          <div
            style={{
              height: "calc(100% - .32rem)",
              width: "100%",
            }}
          >
            <PayCount data={payCountInfo} />
          </div>
        </div>
        <div className="bg-[var(--white)] p-[.24rem] rounded-[var(--border-radius)]">
          <div className="flex items-center justify-between">
            <Filter
              onQuery={queryAssetsTrendCb}
              title="auPay资产趋势"
              showShortcutKey
            />
          </div>
          <div
            style={{
              height: "calc(100% - .32rem)",
              width: "calc(100% - .48rem)",
            }}
          >
            <AssetsTrend data={assetsTrend} />
          </div>
        </div>
      </div>
    </>
  );
};
export default DataCount;
