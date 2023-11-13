import { Input, Select } from "antd";
import styleScope from "./index.module.less";
import TableScope from "./table.jsx";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  FindTransferWalletConfigInterFace,
  FindUserAssetsCollectionConfigInterFace,
  UpdateTransferWalletConfigInterFace,
  UpdateUserAssetsCollectionConfigInterFace,
} from "@/api";
import { formatUnit } from "@/utils/base";
import Icon from "@/Components/Icon";
import { useStopPropagation } from "@/Hooks/StopPropagation";

const AutomatedSystemConfig = () => {
  let [stop] = useStopPropagation();
  let [addrFixDisabled, setAddrFixDisabled] = useState(true);
  let [addrCycleDisabled, setAddrCycleDisabled] = useState(true);
  let [addrHandDisabled, setAddrHandDisabled] = useState(true);
  let [transferAddrArr, setTransferAddrList] = useState([]);
  let [addrCollection, setAddrCollection] = useState<any>({});
  const anytimeAutoTriggerAmountRef = useRef<any>();
  const weekAutoHourNumOfDayRef = useRef<any>();
  const weekAutoDayNumOfWeekRef = useRef<any>();
  const weekAutoTriggerAmountRef = useRef<any>();
  const manualAmountLimitRef = useRef<any>();
  function timeList() {
    let timeList = [];
    for (let index = 1; index <= 24; index++) {
      timeList.push({ value: index, label: index + "点" });
    }
    return timeList;
  }
  // 中转地址
  function transferAddrList() {
    FindTransferWalletConfigInterFace().then((res) => {
      let formatList = res?.data.map((item) => {
        (item.title = formatUnit(
          item.currencyId,
          item.currencyChain
        ).agreement),
          (item.icon = formatUnit(item.currencyId, item.currencyChain).type);
        return item;
      });
      setTransferAddrList(formatList ?? []);
    });
  }
  //抵制归集
  function assetsCollection() {
    FindUserAssetsCollectionConfigInterFace().then((res) => {
      setAddrCollection(res?.data?.[0] ?? {});
    });
  }
  function updateCollectionCb(e, parmas, fn) {
    stop(e, () => {
      UpdateUserAssetsCollectionConfigInterFace(parmas).then(() => {
        setAddrCollection(parmas);
        fn();
      });
    });
  }
  useLayoutEffect(() => {
    transferAddrList();
    assetsCollection();
  }, []);
  return (
    <>
      <CommonBox title="用户地址归集">
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址固定归集：
          </label>
          <div className="flex items-center gap-[.16rem] text-[14px] text-[#333]">
            <span>＞</span>
            <Input
              ref={anytimeAutoTriggerAmountRef}
              key={addrCollection.anytimeAutoTriggerAmount}
              disabled={addrFixDisabled}
              defaultValue={addrCollection.anytimeAutoTriggerAmount}
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            {addrFixDisabled ? (
              <a
                onClick={() => setAddrFixDisabled(!addrFixDisabled)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) => {
                  updateCollectionCb(
                    e,
                    {
                      ...addrCollection,
                      anytimeAutoTriggerAmount:
                        +anytimeAutoTriggerAmountRef.current.input.value,
                    },
                    () => {
                      setAddrFixDisabled(!addrFixDisabled);
                    }
                  );
                }}
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址周期归集：
          </label>
          <div className="flex items-center  gap-[.16rem] text-[14px] text-[#333]">
            <span>每</span>
            <Select
              key={addrCollection.weekAutoDayNumOfWeek + "week"}
              disabled={addrCycleDisabled}
              defaultValue={addrCollection.weekAutoDayNumOfWeek}
              style={{ width: "1.64rem" }}
              onChange={(value) => (weekAutoDayNumOfWeekRef.current = value)}
              options={[
                { value: 1, label: "周一" },
                { value: 2, label: "周二" },
                { value: 3, label: "周三" },
                { value: 4, label: "周四" },
                { value: 5, label: "周五" },
                { value: 6, label: "周六" },
                { value: 7, label: "周日" },
              ]}
            />
            <Select
              onChange={(value) => (weekAutoHourNumOfDayRef.current = value)}
              key={addrCollection.weekAutoHourNumOfDay + "hour"}
              disabled={addrCycleDisabled}
              defaultValue={addrCollection.weekAutoHourNumOfDay}
              style={{ width: "1.64rem" }}
              options={timeList()}
            />
            <span>＞</span>
            <Input
              ref={weekAutoTriggerAmountRef}
              key={addrCollection.weekAutoTriggerAmount + "Amount"}
              disabled={addrCycleDisabled}
              defaultValue={addrCollection.weekAutoTriggerAmount}
              placeholder="请输入"
              className="max-w-[1.64rem] mr-[.16rem] ml-[.1rem]"
              suffix={<>USDT</>}
            />
            {addrCycleDisabled ? (
              <a
                onClick={() => setAddrCycleDisabled(!addrCycleDisabled)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) => {
                  updateCollectionCb(
                    e,
                    {
                      ...addrCollection,
                      weekAutoTriggerAmount:
                        +weekAutoTriggerAmountRef.current.input.value,
                      weekAutoHourNumOfDay: weekAutoHourNumOfDayRef.current,
                      weekAutoDayNumOfWeek: weekAutoDayNumOfWeekRef.current,
                    },
                    () => {
                      setAddrCycleDisabled(!addrCycleDisabled);
                    }
                  );
                }}
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[.24rem] not-first:mt-[.16rem]">
          <label className="text-[14px] text-[var(--menu-color)]">
            用户地址手动归集：
          </label>
          <div className="flex items-center gap-[.16rem] text-[14px] text-[#333]">
            <span>＞</span>
            <Input
              key={addrCollection.manualAmountLimit + "AmountLimit"}
              disabled={addrHandDisabled}
              ref={manualAmountLimitRef}
              defaultValue={addrCollection.manualAmountLimit}
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>USDT</>}
            />
            {addrHandDisabled ? (
              <a
                onClick={() => setAddrHandDisabled(!addrHandDisabled)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) => {
                  updateCollectionCb(
                    e,
                    {
                      ...addrCollection,
                      manualAmountLimit:
                        +manualAmountLimitRef.current.input.value,
                    },
                    () => {
                      setAddrHandDisabled(!addrHandDisabled);
                    }
                  );
                }}
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}
          </div>
        </div>
      </CommonBox>
      <CommonBox title="中转地址">
        <div className="flex gap-[.24rem] flex-wrap">
          {transferAddrArr.map((item) => (
            <TransferAddr key={item.walletId} {...item} title={item.title} />
          ))}
        </div>
      </CommonBox>
      <CommonBox title="提币地址">
        <TableScope />
      </CommonBox>
    </>
  );
};
const TransferAddr = (props) => {
  let [stop] = useStopPropagation();
  let [autoFund, setAutoFund] = useState(true);
  let [transferAccounts, setTransferAccounts] = useState(true);
  let [liquidation, setLiquidation] = useState(true);
  const autoFundRef = useRef<any>();
  const transferAccountsRef = useRef<any>();
  const liquidationRef = useRef<any>();
  const saveInfoCb = useCallback((e, params, fn) => {
    stop(e, () => {
      UpdateTransferWalletConfigInterFace(params).then((res) => {
        fn();
      });
    });
  }, []);
  return (
    <div className="p-[.24rem] bg-[var(--gray)] rounded-[var(--border-radius)]">
      <div className="flex items-center gap-[.16rem] mb-[.24rem]">
        <Icon
          style={{ fontSize: ".46rem" }}
          purity={false}
          name={"h-icon-" + props.icon}
        />
        <label className="text-[22px] text-[#333]">{props.title}</label>
      </div>
      <div className="border-t border-solid border-[var(--border-color)]">
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem] whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            地址：
          </span>
          <span className="text-[.14px] text-[var(--menu-color)]">
            {props.address ?? "--"}
          </span>
        </div>
        <div className="flex items-center mt-[.16rem]  gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            自动储备设置：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <span>≥</span>
            <Input
              disabled={autoFund}
              defaultValue={props.autoReserveTriggerAmount ?? 0}
              placeholder="请输入"
              ref={autoFundRef}
              className="max-w-[1.64rem]"
              suffix={<>{props.icon}</>}
            />
            {autoFund ? (
              <a
                onClick={() => setAutoFund(!autoFund)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) =>
                  saveInfoCb(
                    e,
                    {
                      currencyId: props.currencyId,
                      currencyChain: props.currencyChain,
                      autoReserveTriggerAmount: autoFundRef.current.input.value,
                    },
                    () => {
                      setAutoFund(!autoFund);
                    }
                  )
                }
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}
          </p>
        </div>
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            向储备地址转账：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <Input
              disabled={transferAccounts}
              ref={transferAccountsRef}
              defaultValue={props.reserveAmount ?? 0}
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>{props.icon}/笔</>}
            />
            {transferAccounts ? (
              <a
                onClick={() => setTransferAccounts(!transferAccounts)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) =>
                  saveInfoCb(
                    e,
                    {
                      currencyId: props.currencyId,
                      currencyChain: props.currencyChain,
                      reserveAmount: transferAccountsRef.current.input.value,
                    },
                    () => {
                      setTransferAccounts(!transferAccounts);
                    }
                  )
                }
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}
          </p>
        </div>
        <div className="flex items-center mt-[.16rem] gap-[.24rem]">
          <span className="w-[1.3rem]  whitespace-nowrap text-[.14px] text-[var(--menu-color)]">
            快捷支付清算额度：
          </span>
          <p className="flex items-center gap-[.16rem]">
            <Input
              disabled={liquidation}
              ref={liquidationRef}
              defaultValue={props.fastPaymentSettleAmount ?? 0}
              placeholder="请输入"
              className="max-w-[1.64rem]"
              suffix={<>{props.icon}</>}
            />
            {liquidation ? (
              <a
                onClick={() => setLiquidation(!liquidation)}
                className="text-[var(--blue)]"
              >
                编辑
              </a>
            ) : (
              <a
                onClick={(e) =>
                  saveInfoCb(
                    e,
                    {
                      currencyId: props.currencyId,
                      currencyChain: props.currencyChain,
                      fastPaymentSettleAmount:
                        liquidationRef.current.input.value,
                    },
                    () => {
                      setLiquidation(!liquidation);
                    }
                  )
                }
                className="text-[var(--blue)]"
              >
                保存
              </a>
            )}

            <a className="text-[var(--blue)]">手动清算</a>
          </p>
        </div>
      </div>
    </div>
  );
};
const CommonBox = (props) => {
  return (
    <div className="bg-[var(--white)] rounded-[.06rem] p-[.24rem] first:mt-[-0.08rem] not-first:mt-[.16rem]">
      <p className={styleScope["before_title"]}>{props.title}</p>
      {props.children}
    </div>
  );
};
export default AutomatedSystemConfig;
